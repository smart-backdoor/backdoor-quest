package ua.questapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.questapi.config.security.JwtUtil;
import ua.questapi.controller.dto.request.LoginRequestDto;
import ua.questapi.controller.dto.request.RegistrationRequestDto;
import ua.questapi.controller.dto.response.LoginResponseDto;
import ua.questapi.database.entity.UserEntity;
import ua.questapi.exception.ApplicationException;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserService userService;
  private final JwtUtil jwtUtil;
  private final PasswordEncoder passwordEncoder;

  public void register(RegistrationRequestDto request) {
    userService.createUser(request.getEmail(), request.getPassword());
  }

  public LoginResponseDto login(LoginRequestDto request) {
    UserEntity user = userService.findByEmail(request.getEmail());
    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new ApplicationException("Invalid credentials provided.", HttpStatus.UNAUTHORIZED);
    }
    return new LoginResponseDto(jwtUtil.generateToken(user.getEmail()));
  }
}
