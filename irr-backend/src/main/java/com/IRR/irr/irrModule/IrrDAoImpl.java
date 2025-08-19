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
}
