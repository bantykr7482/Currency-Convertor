package com.example.currencybackend.controller;

import com.example.currencybackend.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CurrencyController {

    @Autowired
    private CurrencyService service;

  // ✅ TEST API (NO DB)
    @GetMapping("/test")
    public Map<String, String> testApi() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "Currency Backend is running successfully");
        return response;
    }
@GetMapping("/service-test")
public String serviceTest() {
    return "Service layer is reachable";
}



    @GetMapping("/rate")
    public double getRate(
            @RequestParam String from,
            @RequestParam String to) {

        return service.getRate(from, to);
    }
    

    @GetMapping("/convert")
    public Map<String, Object> convertCurrency(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam double amount) {

        double convertedAmount = service.convertCurrency(from, to, amount);

        Map<String, Object> response = new HashMap<>();
        response.put("from", from);
        response.put("to", to);
        response.put("amount", amount);
        response.put("convertedAmount", convertedAmount);

        return response;
    }
}
