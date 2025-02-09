package ua.questapi.config.mqtt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.MessageHandler;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class MQTTEventHandlerConfiguration {

  // TODO: migrate on FE side for handling of multiplayer
  @Bean
  @ServiceActivator(inputChannel = "mqttInputChannel")
  public MessageHandler handler() {

    return message -> {
      log.info("Received MQTT message: {}", message.getPayload());
    };
  }
}
