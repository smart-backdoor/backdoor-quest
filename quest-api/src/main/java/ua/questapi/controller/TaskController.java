package ua.questapi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ua.questapi.controller.dto.request.TaskRequestDto;
import ua.questapi.controller.dto.response.ResultResponseDto;
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

  @PostMapping("/{taskId}")
  public TaskResponseDto get(@PathVariable Long taskId) {
    return taskService.getById(taskId);
  }

  @PostMapping("/{taskId}/answer/{answerId}")
  public ResultResponseDto validate(@PathVariable Long taskId, @PathVariable Long answerId) {
    return taskService.validateAnswer(taskId, answerId);
  }
}
