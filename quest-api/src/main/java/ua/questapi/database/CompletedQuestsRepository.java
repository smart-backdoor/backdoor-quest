package ua.questapi.database;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.questapi.database.entity.CompletedQuestsEntity;
import ua.questapi.database.projection.QuestAverageMarkProjection;

public interface CompletedQuestsRepository extends JpaRepository<CompletedQuestsEntity, Long> {

  @Query(
      value =
          """
        SELECT cq.quest_id AS questId, AVG(cq.mark) AS avgMark
        FROM completed_quests cq
        WHERE cq.quest_id IN :questIds
        GROUP BY cq.quest_id
        """,
      nativeQuery = true)
  List<QuestAverageMarkProjection> findAverageMarkByQuestIds(
      @Param("questIds") List<Long> questIds);

  List<CompletedQuestsEntity> findAllByUserId(Long userId);
}
