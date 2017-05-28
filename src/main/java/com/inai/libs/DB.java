package com.inai.libs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DB {

    private final static String USER = "IDAIP";
    private final static String PASS = "idaip2014";
    private final static String URL = "jdbc:oracle:thin:@192.241.222.183:1521:XE";

    private Connection con;
    private Statement stm = null;

    public DB() throws ClassNotFoundException, SQLException {
        Class.forName("oracle.jdbc.driver.OracleDriver");
        this.con = DriverManager.getConnection(DB.URL, DB.USER, DB.PASS);
        this.stm = con.createStatement();
    }

    public DB(DB conx) {
        this.con = conx.getConnection();
        this.stm = conx.getStatement();
    }

    public Connection getConnection() {
        return this.con;
    }

    public Statement getStatement() {
        return this.stm;
    }

    public void close() throws SQLException {
        this.stm.close();
        this.con.close();
    }

}
