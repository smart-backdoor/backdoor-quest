package ua.questapi.database.projection;

import java.math.BigDecimal;

public interface QuestAverageMarkProjection {
  Long getQuestId();

  BigDecimal getAvgMark();
}
