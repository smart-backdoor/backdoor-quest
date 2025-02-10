package ua.questapi.database.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Data;

@Data
@Entity
@Table(name = "completed_quests")
public class CompletedQuestsEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  @JsonIgnore
  private UserEntity user;

  @ManyToOne(optional = false)
  @JoinColumn(name = "quest_id", nullable = false)
  @JsonIgnore
  private QuestEntity questEntity;

  @Column(name = "mark")
  private BigDecimal mark;
}
