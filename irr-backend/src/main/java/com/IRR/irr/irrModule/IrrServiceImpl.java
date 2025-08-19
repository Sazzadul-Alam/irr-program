package com.IRR.irr.irrModule;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class IrrServiceImpl implements  IrrService{
    @Autowired
    private IrrDao irrDao;
    @Override
    public ResponseEntity<?> getProgram() {
        try {
            List<Map<String, Object>> result = irrDao.getProgramDetails();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Error =>{}, Reason =>{}, Stacktrace =>{}", e.getMessage(), e.getCause(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while fetching program details");
        }
    }

    @Override
    public ResponseEntity<?> saveProgram() {
        return null;
    }

}
