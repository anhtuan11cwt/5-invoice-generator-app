package com.quickinvoice.invoice_backend.service;

import com.quickinvoice.invoice_backend.dto.AuthResponse;
import com.quickinvoice.invoice_backend.dto.LoginRequest;
import com.quickinvoice.invoice_backend.dto.RegisterRequest;
import com.quickinvoice.invoice_backend.entity.User;
import com.quickinvoice.invoice_backend.mail.EmailService;
import com.quickinvoice.invoice_backend.repository.UserRepository;
import com.quickinvoice.invoice_backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        String verificationCode = String.format("%06d", new Random().nextInt(999999));

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .enabled(false)
                .verificationCode(verificationCode)
                .verificationCodeExpiry(LocalDateTime.now().plusHours(24))
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        try {
            emailService.sendVerificationEmail(user.getEmail(), verificationCode);
        } catch (Exception e) {
            // Log but continue - user can request new code if needed
        }

        return "Đăng ký thành công. Vui lòng kiểm tra email để xác thực.";
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Thông tin đăng nhập không hợp lệ"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Thông tin đăng nhập không hợp lệ");
        }

        if (!user.isEnabled()) {
            throw new RuntimeException("Email chưa được xác thực. Vui lòng kiểm tra email của bạn.");
        }

        String token = jwtService.generateToken(new CustomUserDetails(user));

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }

    public AuthResponse verifyEmail(String code) {
        User user = userRepository.findByVerificationCode(code)
                .orElseThrow(() -> new RuntimeException("Mã xác thực không hợp lệ"));

        if (user.getVerificationCodeExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Mã xác thực đã hết hạn");
        }

        user.setEnabled(true);
        user.setVerificationCode(null);
        user.setVerificationCodeExpiry(null);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        String token = jwtService.generateToken(new CustomUserDetails(user));

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy email"));

        String resetCode = String.format("%06d", new Random().nextInt(999999));

        user.setResetPasswordCode(resetCode);
        user.setResetPasswordCodeExpiry(LocalDateTime.now().plusHours(1));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        try {
            emailService.sendResetPasswordEmail(user.getEmail(), resetCode);
        } catch (Exception e) {
            // Log but continue
        }
    }

    public void resetPassword(String code, String newPassword) {
        User user = userRepository.findByResetPasswordCode(code)
                .orElseThrow(() -> new RuntimeException("Mã đặt lại không hợp lệ"));

        if (user.getResetPasswordCodeExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Mã đặt lại đã hết hạn");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordCode(null);
        user.setResetPasswordCodeExpiry(null);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
    }
}