package com.quickinvoice.invoice_backend.mail;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send-invoice")
    public ResponseEntity<String> sendInvoice(
            @RequestPart("file") MultipartFile file,
            @RequestPart("customerEmail") String customerEmail
    ) throws MessagingException, IOException {
        emailService.sendInvoiceEmail(customerEmail, file);
        return ResponseEntity.ok("Gửi email thành công");
    }
}
