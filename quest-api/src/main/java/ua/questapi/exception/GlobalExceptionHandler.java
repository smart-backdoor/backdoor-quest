package ua.questapi.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ApplicationException.class)
  public ResponseEntity<ErrorResponse> handleApplicationException(ApplicationException ex) {
    log.error("ApplicationException: {}", ex.getMessage(), ex);
    ErrorResponse error = new ErrorResponse(ex.getHttpStatus().value(), ex.getMessage());
    return new ResponseEntity<>(error, ex.getHttpStatus());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException ex) {
    log.error("Validation error: {}", ex.getMessage(), ex);
    String errorMessage =
        ex.getBindingResult().getAllErrors().stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .collect(Collectors.joining(", "));
    ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), errorMessage);
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ErrorResponse> handleConstraintViolationException(
      ConstraintViolationException ex) {
    log.error("Constraint violation: {}", ex.getMessage(), ex);
    String errorMessage =
        ex.getConstraintViolations().stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.joining(", "));
    ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), errorMessage);
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
    log.error("Unhandled exception: {}", ex.getMessage(), ex);
    ErrorResponse error =
        new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Something went wrong");
    return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
