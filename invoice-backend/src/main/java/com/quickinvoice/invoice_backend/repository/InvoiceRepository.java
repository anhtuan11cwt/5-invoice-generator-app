package com.quickinvoice.invoice_backend.repository;

import com.quickinvoice.invoice_backend.entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    List<Invoice> findByUserId(String userId);
    Optional<Invoice> findByIdAndUserId(String id, String userId);
}
