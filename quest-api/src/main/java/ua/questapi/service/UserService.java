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

  public UserEntity findByEmail(String email) {
    return userRepository
        .findByEmail(email)
        .orElseThrow(
            () ->
                new ApplicationException(
                    String.format("User with email '%s' was not found.", email),
                    HttpStatus.NOT_FOUND));
  }

  public UserEntity createUser(String email, String password) {
    if (existsByEmail(email)) {
      throw new ApplicationException(
          String.format("User with email '%s' already exists.", email), HttpStatus.BAD_REQUEST);
    }
    var userEntity = new UserEntity();
    userEntity.setEmail(email);
    userEntity.setPassword(passwordEncoder.encode(password));
    return userRepository.save(userEntity);
  }

  public UserEntity updateUser(UserEntity user) {
    return userRepository.save(user);
  }

  public boolean existsByEmail(String email) {
    return userRepository.existsByEmail(email);
  }
}
