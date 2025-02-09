package ua.questapi.controller;

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

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {

  private final FileStorageService fileStorageService;

  @PostMapping
  public StorageFileResponseDto create(@RequestPart MultipartFile file) {
    return fileStorageService.saveFile(file);
  }

  @DeleteMapping("/{fileId}")
  public void delete(@PathVariable String fileId) {
    fileStorageService.deleteFile(fileId);
  }
}
