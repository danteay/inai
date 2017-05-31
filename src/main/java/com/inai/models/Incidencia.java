package com.inai.models;


import com.inai.helpers.DBHelpers;
import com.inai.libs.DB;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Incidencia {

    public int incidenciaId;
    public String descripcion;

    private transient DB conx;

    public Incidencia(DB conx) {
        this.conx = conx;
    }

    public Incidencia[] getAll() throws SQLException {
        String query = "SELECT * FROM INCIDENCIAS";
        ResultSet res = this.conx.getStatement().executeQuery(query);

        Incidencia[] list = new Incidencia[DBHelpers.resultSetLength(res)];

        int i = 0;
        while (res.next()) {
            list[i] = new Incidencia(this.conx);
            list[i].incidenciaId = res.getInt(1);
            list[i].descripcion = res.getString(2);
            i++;
        }

        return list;
    }

}
