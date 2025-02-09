package ua.questapi.utils.annotation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.List;
import ua.questapi.controller.dto.request.AnswerRequestDto;

public class SingleCorrectAnswerValidator
    implements ConstraintValidator<ValidAnswers, List<AnswerRequestDto>> {

  @Override
  public boolean isValid(List<AnswerRequestDto> answers, ConstraintValidatorContext context) {
    if (answers == null) {
      return true;
    }

    var correctAnswersCount = answers.stream().filter(AnswerRequestDto::getIsCorrect).count();
    return correctAnswersCount == 1;
  }

  @Override
  public void initialize(ValidAnswers constraintAnnotation) {}
}
