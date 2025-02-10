package ua.questapi.database;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.questapi.database.entity.QuestEntity;

public interface QuestRepository extends JpaRepository<QuestEntity, Long> {
  List<QuestEntity> findAllByUserId(Long userId);
}
