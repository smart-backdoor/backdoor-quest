package ua.questapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MQTTSenderService {

  private final MessageChannel mqttOutputChannel;

  public void publishMqttMessage(String topic, String payload) {
    Message<String> message =
        MessageBuilder.withPayload(payload).setHeader("mqtt_topic", topic).build();
    mqttOutputChannel.send(message);
    log.info("Published MQTT message to {}: {}", topic, payload);
  }
}
