package ua.questapi.database.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.Set;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "quests")
public class QuestEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, name = "title")
  private String title;

  @Column(nullable = false, name = "description")
  private String description;

  @Column(nullable = false, name = "quantity_of_tasks")
  private Long quantityOfTasks;

  @Column(name = "time_limit")
  private Long timeLimit;

  @Column(name = "rate")
  private BigDecimal rate;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  @JsonIgnore
  private UserEntity user;

  @OneToMany(mappedBy = "questEntity", cascade = CascadeType.ALL, orphanRemoval = true)
  @ToString.Exclude
  private Set<TaskEntity> tasks;

  public void incrementTaskCount() {
    this.quantityOfTasks += 1;
  }
}
