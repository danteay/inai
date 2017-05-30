package com.inai.models;


import com.inai.libs.DB;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Periodo {

    public int periodoId;
    public String periodoClave;
    public String description;
    public int tipo;
    public int annio;
    public int estatus;
    public String mes;
    public int mostrar;

    public DB conx;

    public Periodo(DB conx) {
        this.conx = conx;
    }

    public Periodo getByPeriodoId(int id) throws SQLException {
        String query = "SELECT * FROM Periodos WHERE periodo_id = " + id;
        ResultSet res = this.conx.getStatement().executeQuery(query);
        res.first();

        this.periodoId = res.getInt(1);
        this.periodoClave = res.getString(2);
        this.description = res.getString(3);
        this.tipo = res.getInt(4);
        this.annio = res.getInt(5);
        this.estatus = res.getInt(6);
        this.mes = res.getString(7);
        this.mostrar = res.getInt(8);

        return this;
    }

}
