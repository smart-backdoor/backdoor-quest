package ua.questapi.database.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false, name = "email")
  private String email;

  @Column(nullable = false, name = "password")
  private String password;

  @Column(nullable = false, name = "enabled")
  private boolean enabled;

  @Column(name = "avatar")
  private String avatar;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;
}
