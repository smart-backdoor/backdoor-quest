package ua.questapi;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import ua.questapi.config.ApplicationProperties;
import ua.questapi.config.GoogleStorageProperties;
import ua.questapi.config.mqtt.MQTTConfigurationProperties;
import ua.questapi.config.security.SecurityProperties;

@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
@SpringBootApplication
@EnableConfigurationProperties(
    value = {
      SecurityProperties.class,
      MQTTConfigurationProperties.class,
      GoogleStorageProperties.class,
      ApplicationProperties.class
    })
public class QuestApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(QuestApiApplication.class, args);
  }
}
