package com.quickinvoice.invoice_backend.controller;

import com.quickinvoice.invoice_backend.entity.Invoice;
import com.quickinvoice.invoice_backend.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice, Authentication authentication) {
        String userId = authentication.getName();
        return invoiceService.saveInvoice(invoice, userId);
    }

    @GetMapping
    public List<Invoice> getAllInvoices(Authentication authentication) {
        String userId = authentication.getName();
        return invoiceService.findByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable String id, Authentication authentication) {
        String userId = authentication.getName();
        invoiceService.deleteById(id, userId);
        return ResponseEntity.ok("Hóa đơn đã được xóa thành công");
    }
}