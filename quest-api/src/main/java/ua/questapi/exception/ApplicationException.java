package ua.questapi.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApplicationException extends RuntimeException {
  private final HttpStatus httpStatus;

  public ApplicationException(String message, HttpStatus httpStatus) {
    super(message);
    this.httpStatus = httpStatus;
  }

  public ApplicationException(String message) {
    this(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
