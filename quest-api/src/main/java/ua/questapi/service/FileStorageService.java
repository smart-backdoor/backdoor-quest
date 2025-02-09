package ua.questapi.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.questapi.config.GoogleStorageProperties;
import ua.questapi.controller.dto.response.StorageFileResponseDto;
import ua.questapi.enums.FileType;
import ua.questapi.exception.ApplicationException;

@Service
@RequiredArgsConstructor
public class FileStorageService {
  private static final List<String> SUPPORTED_FILE_TYPES =
      Stream.of(FileType.values()).map(FileType::getType).toList();

  private final GoogleStorageProperties properties;
  private Storage storage;

  @PostConstruct
  public void init() {
    GoogleCredentials googleCredentials;
    try {
      var credentials = new File(properties.getGoogleApplicationCredential());
      try (var credentialsStream = new FileInputStream(credentials)) {
        googleCredentials = GoogleCredentials.fromStream(credentialsStream);
      }
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    this.storage =
        StorageOptions.newBuilder().setCredentials(googleCredentials).build().getService();
  }

  public StorageFileResponseDto saveFile(MultipartFile image) {
    var fileName = UUID.randomUUID().toString();
    var url = processFile(fileName, image);
    return new StorageFileResponseDto(fileName, url);
  }

  public void deleteFile(String fileName) {
    try {
      fileName = properties.getFolder() + "/" + fileName;
      storage.delete(properties.getBucketName(), fileName);
    } catch (Exception e) {
      throw new ApplicationException(
          String.format(
              "Exception occurred while deleting file '%s' from storage: %s",
              fileName, e.getMessage()));
    }
  }

  @SneakyThrows
  public String processFile(String fileName, MultipartFile file) {
    handleSupportedSize(file.getSize());
    handleSupportedTypes(file);

    fileName = properties.getFolder() + "/" + fileName;

    if (file.getBytes().length != 0) {
      return uploadFile(file.getBytes(), file.getContentType(), fileName);
    }
    return null;
  }

  private void handleSupportedSize(long byteSize) {
    if (byteSize > properties.getFileSizeMb() * 1024 * 1024) {
      throw new ApplicationException(
          String.format("Media supports files up to %s MB in size.", properties.getFileSizeMb()));
    }
  }

  private void handleSupportedTypes(MultipartFile file) throws IOException {
    var tika = new Tika();
    String detectedType;

    try (var logoInputStream = file.getInputStream()) {
      detectedType = tika.detect(logoInputStream);
    }

    if (!SUPPORTED_FILE_TYPES.contains(detectedType)) {
      var supportedTypeNames =
          Stream.of(FileType.values())
              .map(img -> ".".concat(img.name().toLowerCase()))
              .collect(Collectors.joining(", "));

      throw new ApplicationException(
          String.format("File supports only %s media formats", supportedTypeNames));
    }
  }

  private String uploadFile(byte[] imageBytes, String contentType, String fileName) {
    try {
      var blobId = BlobId.of(properties.getBucketName(), fileName);
      var blobInfo =
          BlobInfo.newBuilder(blobId)
              .setContentType(contentType)
              .setCacheControl("no-store")
              .build();

      try (var fileBytesInputStream = new ByteArrayInputStream(imageBytes)) {
        storage.createFrom(blobInfo, fileBytesInputStream);
      }
      return String.format(
          "https://storage.googleapis.com/%s/%s", properties.getBucketName(), fileName);
    } catch (Exception e) {
      throw new ApplicationException(
          String.format(
              "Exception occurred while saving file '%s' to storage: %s",
              fileName, e.getMessage()));
    }
  }
}
