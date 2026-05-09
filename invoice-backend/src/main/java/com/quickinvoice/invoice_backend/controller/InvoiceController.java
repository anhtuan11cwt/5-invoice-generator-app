package com.quickinvoice.invoice_backend.controller;

import com.quickinvoice.invoice_backend.entity.Invoice;
import com.quickinvoice.invoice_backend.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return invoiceService.saveInvoice(invoice);
    }

    @GetMapping
    public java.util.List<Invoice> getAllInvoices() {
        return invoiceService.findAll();
    }

    @DeleteMapping("/{id}")
    public org.springframework.http.ResponseEntity<?> deleteInvoice(@PathVariable String id) {
        if (invoiceService.existsById(id)) {
            invoiceService.deleteById(id);
            return org.springframework.http.ResponseEntity.ok("Hóa đơn đã được xóa thành công");
        } else {
            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND).body("Không tìm thấy hóa đơn");
        }
    }
}
