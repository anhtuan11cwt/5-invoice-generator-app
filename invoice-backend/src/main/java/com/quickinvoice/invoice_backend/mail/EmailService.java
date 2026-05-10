package com.quickinvoice.invoice_backend.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendInvoiceEmail(String toEmail, MultipartFile file) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Hóa đơn của bạn");
        helper.setText("Xin chào, vui lòng tìm thấy hóa đơn đính kèm dưới đây.\n\nTrân trọng.");

        String fileName = "invoice_" + Instant.now().toEpochMilli() + ".pdf";
        helper.addAttachment(fileName, new ByteArrayResource(file.getBytes()));

        mailSender.send(message);
    }

    public void sendVerificationEmail(String toEmail, String code) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Xác thực email - Quick Invoice");
        helper.setText("Xin chào,\n\n" +
                "Cảm ơn bạn đã đăng ký tài khoản Quick Invoice.\n\n" +
                "Vui lòng nhập mã xác thực sau để kích hoạt tài khoản:\n\n" +
                "Mã xác thực: " + code + "\n\n" +
                "Mã này sẽ hết hạn sau 24 giờ.\n\n" +
                "Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.\n\n" +
                "Trân trọng,\n" +
                "Đội ngũ Quick Invoice");

        mailSender.send(message);
    }

    public void sendResetPasswordEmail(String toEmail, String code) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Đặt lại mật khẩu - Quick Invoice");
        helper.setText("Xin chào,\n\n" +
                "Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn.\n\n" +
                "Mã đặt lại mật khẩu: " + code + "\n\n" +
                "Mã này sẽ hết hạn sau 1 giờ.\n\n" +
                "Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.\n\n" +
                "Trân trọng,\n" +
                "Đội ngũ Quick Invoice");

        mailSender.send(message);
    }
}
