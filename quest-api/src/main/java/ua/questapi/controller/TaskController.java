package ua.questapi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.questapi.controller.dto.request.TaskRequestDto;
import ua.questapi.controller.dto.response.TaskResponseDto;
import ua.questapi.service.TaskService;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

  private final TaskService taskService;

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public TaskResponseDto create(
      @RequestPart(required = false) MultipartFile file,
      @RequestPart("request") @Valid TaskRequestDto request) {
    return taskService.create(request, file);
  }
}
