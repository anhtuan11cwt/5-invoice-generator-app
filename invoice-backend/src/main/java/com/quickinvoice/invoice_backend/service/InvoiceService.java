package com.quickinvoice.invoice_backend.service;

import com.quickinvoice.invoice_backend.entity.Invoice;
import com.quickinvoice.invoice_backend.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public Invoice saveInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public java.util.List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    public boolean existsById(String id) {
        return invoiceRepository.existsById(id);
    }

    public void deleteById(String id) {
        invoiceRepository.deleteById(id);
    }
}
