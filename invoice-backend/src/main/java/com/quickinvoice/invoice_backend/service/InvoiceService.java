package com.quickinvoice.invoice_backend.service;

import com.quickinvoice.invoice_backend.entity.Invoice;
import com.quickinvoice.invoice_backend.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public Invoice saveInvoice(Invoice invoice, String userId) {
        invoice.setUserId(userId);
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> findByUserId(String userId) {
        return invoiceRepository.findByUserId(userId);
    }

    public Invoice findById(String id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn"));
    }

    public void deleteById(String id, String userId) {
        Invoice invoice = invoiceRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn hoặc không có quyền truy cập"));
        invoiceRepository.delete(invoice);
    }
}