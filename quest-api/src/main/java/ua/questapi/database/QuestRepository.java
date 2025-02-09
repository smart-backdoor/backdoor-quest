package ua.questapi.database;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.questapi.database.entity.QuestEntity;

public interface QuestRepository extends JpaRepository<QuestEntity, Long> {}
