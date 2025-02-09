package ua.questapi.mapper.repository.database;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.questapi.controller.dto.request.QuestRequestDto;
import ua.questapi.controller.dto.response.QuestResponseDto;
import ua.questapi.database.entity.QuestEntity;
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

  QuestResponseDto toResponseDto(QuestEntity savedEntity);
}
