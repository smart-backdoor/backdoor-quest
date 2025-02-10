package ua.questapi.mapper.repository.database;

import org.mapstruct.Mapper;
import ua.questapi.controller.dto.response.UserBriefInfoDto;
import ua.questapi.database.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserBriefInfoDto toDto(UserEntity user);
}
