package com.quickinvoice.invoice_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private String fullName;
    private boolean enabled;
    private String verificationCode;
    private LocalDateTime verificationCodeExpiry;
    private String resetPasswordCode;
    private LocalDateTime resetPasswordCodeExpiry;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}