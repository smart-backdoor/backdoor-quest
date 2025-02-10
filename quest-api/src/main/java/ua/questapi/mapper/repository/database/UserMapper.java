package ua.questapi.mapper.repository.database;

import org.mapstruct.*;
import ua.questapi.controller.dto.request.UpdateUserRequestDto;
import ua.questapi.controller.dto.response.UserProfileCompletedQuestResponseDto;
import ua.questapi.controller.dto.response.UserProfileQuestResponseDto;
import ua.questapi.controller.dto.response.UserProfileResponseDto;
import ua.questapi.database.entity.CompletedQuestsEntity;
import ua.questapi.database.entity.QuestEntity;
import ua.questapi.database.entity.UserEntity;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserProfileResponseDto toUserProfileResponseDto(UserEntity userEntity);

  @Mapping(target = "created", source = "quests")
  @Mapping(target = "completed", source = "completedQuests")
  @Mapping(target = "completedAverageMark", ignore = true)
  @Mapping(target = "createdAverageRate", ignore = true)
  UserProfileResponseDto toUserProfileResponseDto(
      UserEntity userEntity,
      List<UserProfileQuestResponseDto> quests,
      List<UserProfileCompletedQuestResponseDto> completedQuests);

  UserProfileQuestResponseDto toUserProfileQuestResponseDto(QuestEntity entity);

  @Mapping(target = "id", source = "id")
  @Mapping(target = "mark", source = "mark")
  @Mapping(target = "title", source = "questEntity.title")
  @Mapping(target = "quantityOfTasks", source = "questEntity.quantityOfTasks")
  @Mapping(target = "file", source = "questEntity.file")
  @Mapping(target = "authorName", source = "questEntity.user.firstName")
  @Mapping(target = "authorAvatar", source = "questEntity.user.avatar")
  UserProfileCompletedQuestResponseDto toUserProfileCompletedQuestResponseDto(
      CompletedQuestsEntity entity);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateUserFromDto(UpdateUserRequestDto dto, @MappingTarget UserEntity entity);
}
