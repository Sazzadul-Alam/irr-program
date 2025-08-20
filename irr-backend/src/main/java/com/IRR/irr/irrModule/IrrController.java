package com.IRR.irr.irrModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/irrcont")
public class IrrController {

    private final IrrService irrService;
    @Autowired
    public IrrController(IrrService irrService){
        this.irrService=irrService;
    }

    @GetMapping("/program")
    public ResponseEntity<?> getProgram() {
        return irrService.getProgram();
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveEnrollment(
            @RequestParam String name,
            @RequestParam String contactNumber,
            @RequestParam String email,
            @RequestParam String trainingMode,
            @RequestParam String program,
            @RequestParam String programPrice,
            @RequestParam String paymentMethod,
            @RequestParam String transactionId) {

        // Save enrollment
        return irrService.saveProgram(name, contactNumber, email, trainingMode,
                program, programPrice, paymentMethod, transactionId);
    }

}
