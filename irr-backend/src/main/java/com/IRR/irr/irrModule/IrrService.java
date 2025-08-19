package com.IRR.irr.irrModule;

import org.springframework.http.ResponseEntity;

public interface IrrService {
    ResponseEntity<?> getProgram();


    ResponseEntity<?> saveProgram(String name, String contactNumber, String email, String trainingMode, String program, String programPrice, String paymentMethod, String transactionId);
}
