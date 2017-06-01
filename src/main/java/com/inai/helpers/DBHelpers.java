package com.inai.helpers;


import java.sql.ResultSet;
import java.sql.SQLException;

public class DBHelpers {

    public static boolean isEmptyResultSet(ResultSet res) {
        try {
            res.getObject(1);
            return false;
        } catch(Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return true;
        }
    }

}
