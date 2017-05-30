package com.inai.models;


import com.inai.libs.DB;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Articulo {

    public int articuloId;
    public String articuloClave;
    public String descripcion;
    public int estatus;

    private transient DB conx;

    public Articulo(DB conx) {
        this.conx = conx;
    }

    public Articulo getByArticuloId(int id) throws SQLException {
        String query = "SELECT * FROM Evaluaciones WHERE evaluacion_id = " + id;
        ResultSet res = this.conx.getStatement().executeQuery(query);
        res.next();

        this.articuloId = res.getInt(1);
        this.articuloClave = res.getString(2);
        this.descripcion = res.getString(3);
        this.estatus = res.getInt(4);

        return this;
    }

}
