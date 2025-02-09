package ua.questapi.controller;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.questapi.controller.dto.response.StorageFileResponseDto;
import ua.questapi.service.FileStorageService;

@Tag(name = "File")
@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {

  private final FileStorageService fileStorageService;

  @PostMapping(consumes = MULTIPART_FORM_DATA_VALUE)
  public StorageFileResponseDto create(@RequestPart MultipartFile file) {
    return fileStorageService.saveFile(file);
  }

  @DeleteMapping("/{fileId}")
  public void delete(@PathVariable String fileId) {
    fileStorageService.deleteFile(fileId);
  }
}
