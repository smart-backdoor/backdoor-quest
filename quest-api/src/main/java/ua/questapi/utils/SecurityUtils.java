package ua.questapi.utils;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import ua.questapi.exception.ApplicationException;

@UtilityClass
public class SecurityUtils {

  public User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null) {
      throw new ApplicationException("Authentication error occurred");
    }
    return (User) authentication.getPrincipal();
  }
}
