package ua.questapi.mapper.repository.database;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.questapi.controller.dto.request.TaskRequestDto;
import ua.questapi.controller.dto.response.TaskResponseDto;
import ua.questapi.database.entity.TaskEntity;

@Mapper(
    componentModel = "spring",
    uses = {AnswerMapper.class})
public interface TaskMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "title", source = "requestDto.title")
  @Mapping(target = "file", source = "file")
  @Mapping(target = "questEntity", ignore = true)
  @Mapping(target = "answers", ignore = true)
  TaskEntity toCreateEntity(TaskRequestDto requestDto, String file);

  @Mapping(target = "questId", source = "questEntity.id")
  @Mapping(target = "taskId", source = "id")
  TaskResponseDto toDto(TaskEntity taskEntity);
}
