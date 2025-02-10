package ua.questapi.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.questapi.config.ApplicationProperties;
import ua.questapi.config.security.JwtUtil;
import ua.questapi.controller.dto.request.LoginRequestDto;
import ua.questapi.controller.dto.request.RegistrationRequestDto;
import ua.questapi.controller.dto.response.ConfirmResponseDto;
import ua.questapi.controller.dto.response.LoginResponseDto;
import ua.questapi.database.ConfirmationTokenRepository;
import ua.questapi.database.entity.TokenEntity;
import ua.questapi.database.entity.UserEntity;
import ua.questapi.enums.TokenType;
import ua.questapi.exception.ApplicationException;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserService userService;
  private final JwtUtil jwtUtil;
  private final PasswordEncoder passwordEncoder;
  private final ConfirmationTokenRepository tokenRepository;
  private final MailService mailService;
  private final ApplicationProperties applicationProperties;

  @Transactional
  public void register(RegistrationRequestDto request) {
    var user = userService.createUser(request.getEmail(), request.getPassword());
    var token = buildToken(user, TokenType.CONFIRMATION);
    String confirmationLink = applicationProperties.getUi() + "/confirmation/" + token.getToken();
    mailService.sendConfirmationMail(user.getEmail(), confirmationLink);
  }

  @Transactional
  public ConfirmResponseDto confirmToken(String token) {
    var confirmationToken = findToken(token);
    enableUser(confirmationToken);
    tokenRepository.delete(confirmationToken);
    return new ConfirmResponseDto(
        confirmationToken.getUser().getEmail(), confirmationToken.getType());
  }

  @Transactional
  public LoginResponseDto login(LoginRequestDto request) {
    UserEntity user = userService.findByEmail(request.getEmail());
    if (!passwordEncoder.matches(request.getPassword(), user.getPassword()) || !user.isEnabled()) {
      throw new ApplicationException("Invalid credentials provided.", HttpStatus.UNAUTHORIZED);
    }

    return new LoginResponseDto(
        jwtUtil.generateToken(user.getEmail()),
        user.getEmail(),
        user.getId(),
        user.getAvatar(),
        user.getFirstName());
  }

  @Transactional
  public void restorePassword(String email) {
    UserEntity user;
    try {
      user = userService.findByEmail(email);
    } catch (ApplicationException e) {
      log.info("Restore password failed", e);
      return;
    }
    var token = buildToken(user, TokenType.RESTORE);
    String restoreLink = applicationProperties.getUi() + "/restore/" + token.getToken();
    mailService.sendRestorePasswordMail(email, restoreLink);
  }

  @Transactional
  public void updatePassword(RegistrationRequestDto requestDto) {
    var user = userService.findByEmail(requestDto.getEmail());
    user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
    userService.updateUser(user);
  }

  private TokenEntity buildToken(UserEntity user, TokenType type) {
    TokenEntity confirmationToken = new TokenEntity();
    var token = UUID.randomUUID().toString();
    confirmationToken.setToken(token);
    confirmationToken.setUser(user);
    confirmationToken.setExpiryDate(Instant.now().plus(1, ChronoUnit.DAYS));
    confirmationToken.setType(type);
    tokenRepository.save(confirmationToken);
    return confirmationToken;
  }

  private void enableUser(TokenEntity confirmationToken) {
    UserEntity user = confirmationToken.getUser();
    user.setEnabled(true);
    userService.updateUser(user);
  }

  private TokenEntity findToken(String token) {
    var tokenEntity =
        tokenRepository
            .findByToken(token)
            .orElseThrow(
                () ->
                    new ApplicationException("Invalid confirmation token", HttpStatus.BAD_REQUEST));

    if (tokenEntity.getExpiryDate().isBefore(Instant.now())) {
      throw new ApplicationException("Token has expired", HttpStatus.BAD_REQUEST);
    }

    return tokenEntity;
  }
}
