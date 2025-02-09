package ua.questapi.utils.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = SingleCorrectAnswerValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidAnswers {
  String message() default "There must be exactly one correct answer in the list.";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
