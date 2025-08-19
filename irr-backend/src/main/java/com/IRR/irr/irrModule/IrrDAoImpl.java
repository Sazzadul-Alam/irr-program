package com.IRR.irr.irrModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class IrrDAoImpl implements  IrrDao{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> getProgramDetails() {
        final String sql = "SELECT id,program_name,price FROM program_list";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public void saveDetails(String name, String contactNumber, String email, String trainingMode, String program, String programPrice, String paymentMethod, String transactionId) {

            String sql = "INSERT INTO irr_data (name, email, contact, training_mode,  program_name, trx_id) " +
                    "VALUES (?, ?, ?, ?, ?, ?)";


        jdbcTemplate.update(sql, name, email, contactNumber, trainingMode,  program, transactionId);

        }


}
