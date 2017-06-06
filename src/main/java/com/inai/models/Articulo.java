package com.inai.models;


import com.inai.helpers.DBHelpers;
import com.inai.libs.DB;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

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

    public ArrayList<Articulo> getByEvaluacionId(int id) throws SQLException {
        String query = "SELECT a.* FROM ARTICULOS a, EVALUACIONES_ARTICULOS sa, EVALUACIONES e " +
                "WHERE sa.EVALUACION_ID = e.EVALUACION_ID " +
                "AND a.ARTICULO_ID = sa.ARTICULO_ID " +
                "AND e.EVALUACION_ID = " + id + " " +
                "ORDER BY a.ARTICULO_ID";

        ResultSet res = this.conx.getStatement().executeQuery(query);

        ArrayList<Articulo> list = new ArrayList<>();

        while (res.next()) {
            Articulo art = new Articulo(this.conx);
            art.articuloId = res.getInt(1);
            art.articuloClave = res.getString(2);
            art.descripcion = res.getString(3);
            art.estatus = res.getInt(4);

            list.add(art);
        }

        return list;
    }

}
