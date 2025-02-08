package ua.questapi.config.mqtt;

import java.util.List;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "questapi.mqtt")
public class MQTTConfigurationProperties {
  private String brokerUrl;
  private String clientId;
  private String defaultTopic;
  private int qos;
  private boolean cleanSession;
  private List<String> topics;
}
