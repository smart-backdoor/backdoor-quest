package ua.questapi.config.security;

import java.util.List;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "questapi.security")
public class SecurityProperties {
  private String secretKey;
  private long expiration;
  private List<String> allowedOrigins;
  private List<String> allowedMethods;
  private List<String> allowedHeaders;
}
