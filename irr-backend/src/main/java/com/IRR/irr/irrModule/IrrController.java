package com.IRR.irr.irrModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Irr")
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
