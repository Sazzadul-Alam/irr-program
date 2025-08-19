package com.IRR.irr.irrModule;

import org.springframework.http.ResponseEntity;

public interface IrrService {
    ResponseEntity<?> getProgram();

    ResponseEntity<?> saveProgram();
}
