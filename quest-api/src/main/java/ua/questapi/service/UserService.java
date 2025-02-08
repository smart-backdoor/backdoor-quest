package ua.questapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.questapi.database.UserRepository;
import ua.questapi.database.entity.UserEntity;
import ua.questapi.exception.ApplicationException;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  UserEntity findByEmail(String email) {
    return userRepository
        .findByEmail(email)
        .orElseThrow(
            () ->
                new ApplicationException(
                    String.format("User with email '%s' was not found.", email),
                    HttpStatus.NOT_FOUND));
  }

  public void createUser(String email, String password) {
    if (userRepository.existsByEmail(email)) {
      throw new ApplicationException(
          String.format("User with email '%s' already exists.", email), HttpStatus.BAD_REQUEST);
    }
    var userEntity = new UserEntity();
    userEntity.setEmail(email);
    userEntity.setPassword(passwordEncoder.encode(password));
    userRepository.save(userEntity);
  }
}
