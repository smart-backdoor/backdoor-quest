package ua.questapi.database;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.questapi.database.entity.TokenEntity;

public interface ConfirmationTokenRepository extends JpaRepository<TokenEntity, Long> {
  Optional<TokenEntity> findByToken(String token);
}
