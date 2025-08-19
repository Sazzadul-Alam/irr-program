package com.IRR.irr.irrModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
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

}
