package ua.questapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.questapi.controller.dto.response.ResultResponseDto;
import ua.questapi.controller.dto.response.TaskResponseDto;
import ua.questapi.service.TaskService;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

  private final TaskService taskService;

  @PostMapping("/{taskId}")
  public TaskResponseDto get(@PathVariable Long taskId) {
    return taskService.getById(taskId);
  }

  @PostMapping("/{taskId}/answer/{answerId}")
  public ResultResponseDto validate(@PathVariable Long taskId, @PathVariable Long answerId) {
    return taskService.validateAnswer(taskId, answerId);
  }
}
