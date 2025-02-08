package ua.questapi.config.mqtt;

import lombok.RequiredArgsConstructor;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.core.MessageProducer;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;

@Configuration
@RequiredArgsConstructor
public class MQTTBrokerConfiguration {

  private final MQTTConfigurationProperties mqttProperties;

  @Bean
  public MqttPahoClientFactory mqttClientFactory() {
    var factory = new DefaultMqttPahoClientFactory();
    var options = new MqttConnectOptions();
    options.setServerURIs(new String[] {mqttProperties.getBrokerUrl()});
    options.setCleanSession(mqttProperties.isCleanSession());
    factory.setConnectionOptions(options);
    return factory;
  }

  @Bean
  public MessageChannel mqttInputChannel() {
    return new DirectChannel();
  }

  @Bean
  public MessageProducer inbound() {
    MqttPahoMessageDrivenChannelAdapter adapter =
        new MqttPahoMessageDrivenChannelAdapter(
            mqttProperties.getClientId(),
            mqttClientFactory(),
            mqttProperties.getTopics().toArray(new String[0]));
    adapter.setOutputChannel(mqttInputChannel());
    return adapter;
  }

  @Bean
  @ServiceActivator(inputChannel = "mqttInputChannel")
  public MessageHandler handler() {
    return message -> System.out.println("Received MQTT message: " + message.getPayload());
  }

  @Bean
  public MessageChannel mqttOutputChannel() {
    return new DirectChannel();
  }

  @Bean
  @ServiceActivator(inputChannel = "mqttOutputChannel")
  public MessageHandler mqttOutbound() {
    MqttPahoMessageHandler messageHandler =
        new MqttPahoMessageHandler(
            mqttProperties.getClientId() + "_publisher", mqttClientFactory());
    messageHandler.setAsync(true);
    messageHandler.setDefaultTopic(mqttProperties.getDefaultTopic());
    return messageHandler;
  }
}
