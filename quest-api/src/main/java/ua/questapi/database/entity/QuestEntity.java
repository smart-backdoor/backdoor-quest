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
import java.util.Objects;
import java.util.Set;
import lombok.Data;
import org.hibernate.proxy.HibernateProxy;

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

  @Column(name = "file")
  private String file;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  @JsonIgnore
  private UserEntity user;

  @OneToMany(mappedBy = "questEntity", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<TaskEntity> tasks;

  public void incrementTaskCount() {
    this.quantityOfTasks += 1;
  }

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
    QuestEntity that = (QuestEntity) obj;
    return getId() != null && Objects.equals(getId(), that.getId());
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
