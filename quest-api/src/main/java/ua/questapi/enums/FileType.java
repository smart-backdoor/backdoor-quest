package ua.questapi.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FileType {
  SVG("image/svg+xml"),
  JPG("image/jpg"),
  GIF("image/gif"),
  PNG("image/png"),
  JPEG("image/jpeg");

  private final String type;
}
