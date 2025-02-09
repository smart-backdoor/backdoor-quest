package ua.questapi.mapper.repository.database;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ua.questapi.controller.dto.request.QuestRequestDto;
import ua.questapi.controller.dto.response.QuestResponseDto;
import ua.questapi.database.entity.QuestEntity;
import ua.questapi.database.entity.TaskEntity;
import ua.questapi.database.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface QuestMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "title", source = "requestDto.title")
  @Mapping(target = "description", source = "requestDto.description")
  @Mapping(target = "quantityOfTasks", constant = "0L")
  @Mapping(target = "timeLimit", source = "requestDto.timeLimit")
  @Mapping(target = "rate", ignore = true)
  @Mapping(target = "user", source = "user")
  @Mapping(target = "tasks", ignore = true)
  QuestEntity toCreateEntity(QuestRequestDto requestDto, UserEntity user);

  @Mapping(target = "taskIds", source = "entity", qualifiedByName = "getTaskIds")
  QuestResponseDto toResponseDto(QuestEntity entity);

  @Named("getTaskIds")
  default List<Long> getTaskIds(QuestEntity entity) {
    return entity.getTasks().stream().map(TaskEntity::getId).toList();
  }
}
