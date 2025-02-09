package ua.questapi.database.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.Data;
import org.hibernate.proxy.HibernateProxy;

@Data
@Entity
@Table(name = "answers")
public class AnswerEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, name = "title")
  private String title;

  @Column(nullable = false, name = "is_correct")
  private Boolean isCorrect;

  @ManyToOne(optional = false)
  @JoinColumn(name = "task_id", nullable = false)
  @JsonIgnore
  private TaskEntity taskEntity;

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    Class<?> oEffectiveClass =
        obj instanceof HibernateProxy
            ? ((HibernateProxy) obj).getHibernateLazyInitializer().getPersistentClass()
            : obj.getClass();
    Class<?> thisEffectiveClass =
        this instanceof HibernateProxy
            ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass()
            : this.getClass();
    if (thisEffectiveClass != oEffectiveClass) return false;
    AnswerEntity that = (AnswerEntity) obj;
    return getId() != null && Objects.equals(getId(), that.getId());
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
