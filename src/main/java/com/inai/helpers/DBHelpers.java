package com.inai.helpers;


import java.sql.ResultSet;
import java.sql.SQLException;

public class DBHelpers {

    public static int resultSetLength(ResultSet res) throws SQLException {
        int rowcount = 0;
        if (res.last()) {
            rowcount = res.getRow();
            res.beforeFirst();
        }

        return rowcount;
    }

}
