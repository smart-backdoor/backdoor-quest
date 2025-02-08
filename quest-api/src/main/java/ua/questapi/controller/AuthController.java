package ua.questapi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.questapi.controller.dto.request.LoginRequestDto;
import ua.questapi.controller.dto.request.RegistrationRequestDto;
import ua.questapi.controller.dto.response.LoginResponseDto;
import ua.questapi.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/register")
  public void register(@Valid @RequestBody RegistrationRequestDto request) {
    authService.register(request);
  }

  @PostMapping("/login")
  public LoginResponseDto login(@Valid @RequestBody LoginRequestDto request) {
    return authService.login(request);
  }
}
