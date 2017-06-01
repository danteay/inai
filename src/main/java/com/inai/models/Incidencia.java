package com.inai.models;


import com.inai.helpers.DBHelpers;
import com.inai.libs.DB;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Incidencia {

    public int incidenciaId;
    public String descripcion;

    private transient DB conx;

    public Incidencia(DB conx) {
        this.conx = conx;
    }

    public ArrayList<Incidencia> getAll() throws SQLException {
        String query = "SELECT * FROM INCIDENCIAS";
        ResultSet res = this.conx.getStatement().executeQuery(query);

        ArrayList<Incidencia> list = new ArrayList<>();

        while (res.next()) {
            Incidencia ica = new Incidencia(this.conx);
            ica.incidenciaId = res.getInt(1);
            ica.descripcion = res.getString(2);

            list.add(ica);
        }

        return list;
    }

}
