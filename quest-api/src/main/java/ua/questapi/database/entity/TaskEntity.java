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
import java.util.List;
import lombok.Data;

@Data
@Entity
@Table(name = "tasks")
public class TaskEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, name = "title")
  private String title;

  @Column(name = "file")
  private String file;

  @ManyToOne(optional = false)
  @JoinColumn(name = "quest_id", nullable = false)
  @JsonIgnore
  private QuestEntity questEntity;

  @OneToMany(mappedBy = "taskEntity", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<AnswerEntity> answers;

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    TaskEntity that = (TaskEntity) obj;
    return id != null && id.equals(that.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
