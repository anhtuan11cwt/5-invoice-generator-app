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
}
