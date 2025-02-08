package ua.questapi.database;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.questapi.database.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByEmail(String email);

  Boolean existsByEmail(String email);
}
