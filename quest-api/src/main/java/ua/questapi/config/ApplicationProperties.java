package ua.questapi.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "questapi.url")
public class ApplicationProperties {
  private String ui;
}
