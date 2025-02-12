package ua.questapi.mapper.repository.database;

import java.math.BigDecimal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.questapi.database.entity.CompletedQuestsEntity;
import ua.questapi.database.entity.QuestEntity;
import ua.questapi.database.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface CompletedQuestMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "rate", source = "rate")
  CompletedQuestsEntity toEntity(
      UserEntity userEntity, QuestEntity questEntity, BigDecimal mark, BigDecimal rate);
}
