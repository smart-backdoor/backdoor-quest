package ua.questapi.database.entity;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.Data;
import ua.questapi.enums.TokenType;

@Data
@Entity
@Table(name = "token")
public class TokenEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String token;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private UserEntity user;

  @Column(nullable = false)
  private Instant expiryDate;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private TokenType type;
}
