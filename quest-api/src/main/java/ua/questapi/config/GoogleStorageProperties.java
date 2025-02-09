package ua.questapi.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@AllArgsConstructor
@ConfigurationProperties(prefix = "questapi.cloud-storage")
public class GoogleStorageProperties {
  private String folder;
  private String bucketName;
  private String googleApplicationCredential;
  private Integer fileSizeMb;
}
