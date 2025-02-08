package ua.questapi.service;

import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ua.questapi.database.entity.UserEntity;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserService userService;

  @Override
  public UserDetails loadUserByUsername(String email) {
    UserEntity user = userService.findByEmail(email);
    return new User(user.getEmail(), user.getPassword(), Collections.emptyList());
  }
}
