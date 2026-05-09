package com.quickinvoice.invoice_backend.repository;

import com.quickinvoice.invoice_backend.entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends MongoRepository<Invoice, String> {
}
