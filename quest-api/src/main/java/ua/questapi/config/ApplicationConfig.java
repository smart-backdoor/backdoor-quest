package ua.questapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ApplicationConfig {
  private static final Integer STRENGTH = 6;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(STRENGTH);
  }
}
