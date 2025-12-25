package com.example.currencybackend.service;

import com.example.currencybackend.repository.ExchangeRateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CurrencyService {

    @Autowired
    private ExchangeRateRepository repository;

    public double getRate(String from, String to) {
        return repository.findByFromCurrencyAndToCurrency(from, to)
                .orElseThrow(() -> new RuntimeException("Exchange rate not found"))
                .getRate();
    }

    public double convertCurrency(String from, String to, double amount) {
        return amount * getRate(from, to);
    }
}
