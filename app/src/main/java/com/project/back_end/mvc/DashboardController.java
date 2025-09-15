package com.project.back_end.mvc;

import com.project.back_end.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@Controller
public class DashboardController {

    @Autowired
    private Service service;

    // Dashboard para el Administrador
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        Map<String, Object> validationResponse = service.validateToken(token, "admin");

        if (validationResponse.isEmpty()) {
            return "admin/adminDashboard";  // Se busca en templates/admin/adminDashboard.html
        } else {
            return "redirect:/";  // Token inválido → redirección a inicio
        }
    }

    // Dashboard para el Médico
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        Map<String, Object> validationResponse = service.validateToken(token, "doctor");

        if (validationResponse.isEmpty()) {
            return "doctor/doctorDashboard";  // Se busca en templates/doctor/doctorDashboard.html
        } else {
            return "redirect:/";
        }
    }
}