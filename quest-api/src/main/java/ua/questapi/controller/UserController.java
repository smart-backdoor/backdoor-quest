package ua.questapi.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.questapi.controller.dto.response.UserProfileResponseDto;
import ua.questapi.service.UserService;

@Tag(name = "User")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/profile/{userId}")
  public UserProfileResponseDto getProfile(@PathVariable Long userId) {
    return userService.getProfile(userId);
  }

  @PatchMapping("/profile/{userId}")
  public UserProfileResponseDto updateProfile(
      @Valid @RequestBody UserProfileResponseDto request, @PathVariable Long userId) {
    return userService.updateProfile(userId, request);
  }
}
