package com.IRR.irr.irrModule;

import java.util.List;
import java.util.Map;

public interface IrrDao {
    List<Map<String, Object>> getProgramDetails();

    void saveDetails(String name, String contactNumber, String email, String trainingMode, String program, String programPrice, String paymentMethod, String transactionId);

}
