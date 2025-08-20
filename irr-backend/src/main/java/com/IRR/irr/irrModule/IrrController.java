package com.IRR.irr.irrModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

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
    @PostMapping("/uploadLocal")
    public ResponseEntity<?> uploadLocal(
            @RequestParam("file") MultipartFile file,
            @RequestParam("transactionId") String transactionId) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No file uploaded"));
        }
        // Server-side size check (5MB)
        if (file.getSize() > 5 * 1024 * 1024) {
            return ResponseEntity.badRequest().body(Map.of("error", "File exceeds 5MB"));
        }
        // Type whitelist
        String ct = file.getContentType() == null ? "" : file.getContentType().toLowerCase();
        if (!(ct.equals("application/pdf") || ct.equals("image/jpeg") || ct.equals("image/png"))) {
            return ResponseEntity.badRequest().body(Map.of("error", "Only PNG, JPG, or PDF allowed"));
        }

        try {
            Path reportsDir = Paths.get("../reports").toAbsolutePath().normalize();
            Files.createDirectories(reportsDir);

            // Keep extension
            String ext = ".bin";
            String name = file.getOriginalFilename();
            if (name != null && name.contains(".")) {
                ext = name.substring(name.lastIndexOf('.'));
            } else if (ct.equals("application/pdf")) ext = ".pdf";
            else if (ct.equals("image/jpeg")) ext = ".jpg";
            else if (ct.equals("image/png")) ext = ".png";

            String newFileName = transactionId + ext;
            Path target = reportsDir.resolve(newFileName);

            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok(Map.of(
                    "message", "File saved",
                    "fileName", newFileName,
                    "path", target.toString()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("error", "Could not save file", "message", e.getMessage())
            );
        }
    }


}
