package ua.questapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import ua.questapi.config.security.SecurityProperties;

@SpringBootApplication
@EnableConfigurationProperties(SecurityProperties.class)
public class QuestApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(QuestApiApplication.class, args);
  }
}
