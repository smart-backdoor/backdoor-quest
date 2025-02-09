package ua.questapi.service;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import ua.questapi.exception.ApplicationException;

@Service
@RequiredArgsConstructor
public class MailService {

  private final JavaMailSender mailSender;

  public void sendConfirmationMail(String toEmail, String link) {
    var message =
        buildEmail(
            toEmail,
            "Thank you for registering. Please click the link below to confirm your registration:\n"
                + link,
            "[questApi] Please confirm your registration");

    sendEmail(message);
  }

  public void sendRestorePasswordMail(String toEmail, String link) {
    var message =
        buildEmail(
            toEmail,
            "We received a request to change your password. Please follow the link to proceed. If you did not request this change, you can ignore this message.\n"
                + link,
            "[questApi] Restore password");

    sendEmail(message);
  }

  private static SimpleMailMessage buildEmail(String toEmail, String text, String subject) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(toEmail);
    message.setSubject(subject);
    message.setFrom("questapi@questapi.com");
    message.setText(text);
    return message;
  }

  private void sendEmail(SimpleMailMessage message) {
    try {
      mailSender.send(message);
    } catch (Exception e) {
      throw new ApplicationException("Server temporally unavailable", INTERNAL_SERVER_ERROR, e);
    }
  }
}
