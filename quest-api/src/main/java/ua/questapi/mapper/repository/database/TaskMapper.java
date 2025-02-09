package ua.questapi.mapper.repository.database;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.questapi.controller.dto.request.TaskRequestDto;
import ua.questapi.controller.dto.response.TaskResponseDto;
import ua.questapi.controller.dto.response.TaskWithoutCorrectAnswerResponseDto;
import ua.questapi.database.entity.TaskEntity;

@Mapper(
    componentModel = "spring",
    uses = {AnswerMapper.class})
public interface TaskMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "title", source = "requestDto.title")
  @Mapping(target = "file", source = "requestDto.file")
  @Mapping(target = "questEntity", ignore = true)
  @Mapping(target = "answers", ignore = true)
  TaskEntity toCreateEntity(TaskRequestDto requestDto);

  TaskWithoutCorrectAnswerResponseDto toCurrentTask(TaskResponseDto response);

  TaskResponseDto toDto(TaskEntity taskEntity);
}
