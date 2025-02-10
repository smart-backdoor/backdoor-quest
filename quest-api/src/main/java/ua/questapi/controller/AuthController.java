package ua.questapi.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.questapi.controller.dto.request.LoginRequestDto;
import ua.questapi.controller.dto.request.RegistrationRequestDto;
import ua.questapi.controller.dto.response.LoginResponseDto;
import ua.questapi.service.AuthService;

@Tag(name = "Authentication")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/register")
  public void register(@Valid @RequestBody RegistrationRequestDto request) {
    authService.register(request);
  }

  @PostMapping("/confirm/{token}")
  public String confirm(@PathVariable String token) {
    return authService.confirmToken(token);
  }

  @PostMapping("/restore/{email}")
  public void restore(@PathVariable String email) {
    authService.restorePassword(email);
  }

  @PostMapping("/update")
  public void update(@Valid @RequestBody RegistrationRequestDto requestDto) {
    authService.updatePassword(requestDto);
  }

  @PostMapping("/login")
  public LoginResponseDto login(@Valid @RequestBody LoginRequestDto request) {
    return authService.login(request);
  }
}
