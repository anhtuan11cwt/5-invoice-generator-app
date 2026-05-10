package com.quickinvoice.invoice_backend.controller;

import com.quickinvoice.invoice_backend.dto.AuthResponse;
import com.quickinvoice.invoice_backend.dto.LoginRequest;
import com.quickinvoice.invoice_backend.dto.RegisterRequest;
import com.quickinvoice.invoice_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String message = userService.register(request);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/verify")
    public ResponseEntity<AuthResponse> verifyEmail(@RequestParam String code) {
        AuthResponse response = userService.verifyEmail(code);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        userService.forgotPassword(email);
        return ResponseEntity.ok("Đã gửi email đặt lại mật khẩu");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String code, @RequestParam String newPassword) {
        userService.resetPassword(code, newPassword);
        return ResponseEntity.ok("Đặt lại mật khẩu thành công");
    }
}