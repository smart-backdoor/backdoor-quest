package ua.questapi.mapper.repository.database;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.questapi.controller.dto.request.AnswerRequestDto;
import ua.questapi.controller.dto.response.AnswerResponseDto;
import ua.questapi.database.entity.AnswerEntity;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "taskEntity", ignore = true)
  @Mapping(target = "isCorrect", source = "isCorrect")
  AnswerEntity toEntity(AnswerRequestDto answerRequestDto);

  List<AnswerEntity> toEntityList(List<AnswerRequestDto> answers);

  AnswerResponseDto toDto(AnswerEntity answerEntity);

  List<AnswerResponseDto> toDtoList(List<AnswerEntity> answers);
}
