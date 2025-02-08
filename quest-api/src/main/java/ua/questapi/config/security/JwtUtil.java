package ua.questapi.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

  private final SecurityProperties securityProperties;

  public String generateToken(String email) {
    var now = Instant.now();

    return Jwts.builder()
        .subject(email)
        .issuedAt(Date.from(now))
        .expiration(Date.from(now.plus(securityProperties.getExpiration(), ChronoUnit.MILLIS)))
        .signWith(getSecretKey())
        .compact();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token);
      return true;
    } catch (JwtException | IllegalArgumentException e) {
      log.error(e.getMessage(), e);
      return false;
    }
  }

  public String getEmailFromToken(String token) {
    Claims claims =
        Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token).getPayload();
    return claims.getSubject();
  }

  private SecretKey getSecretKey() {
    byte[] keyBytes = Decoders.BASE64.decode(securityProperties.getSecretKey());
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
