package com.example.currencybackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.currencybackend.model.ExchangeRate;

public interface ExchangeRateRepository
        extends JpaRepository<ExchangeRate, Long> {

    Optional<ExchangeRate> findByFromCurrencyAndToCurrency(
            String fromCurrency, String toCurrency);
}
