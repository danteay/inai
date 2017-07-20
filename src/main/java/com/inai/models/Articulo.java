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
    public double percent;

    private transient DB conx;

    public Articulo(DB conx) {
        this.conx = conx;
    }

    public Articulo getByArticuloId(int evalId, int artId) throws SQLException {
        String query = "SELECT a.*, FUN_OBT_PORC_ART_EVA(" + evalId +", " + artId + ") AS percent " +
                "FROM ARTICULOS a " +
                "WHERE a.ARTICULO_ID = " + artId + " " +
                "AND a.ESTATUS = 1" +
                "ORDER BY a.ARTICULO_ID";

        ResultSet res = this.conx.getStatement().executeQuery(query);
        res.next();

        this.articuloId = res.getInt(1);
        this.articuloClave = res.getString(2);
        this.descripcion = res.getString(3);
        this.estatus = res.getInt(4);
        this.percent = res.getDouble(5);

        return this;
    }

    public ArrayList<Articulo> getByEvaluacionId(int evalId) throws SQLException {
        String query = "SELECT a.*, FUN_OBT_PORC_ART_EVA(" + evalId + ", a.ARTICULO_ID) AS percent " +
                "FROM ARTICULOS a, EVALUACIONES_ARTICULOS sa, EVALUACIONES e " +
                "WHERE sa.EVALUACION_ID = e.EVALUACION_ID " +
                "AND a.ARTICULO_ID = sa.ARTICULO_ID " +
                "AND e.EVALUACION_ID = " + evalId + " " +
                "ORDER BY a.ARTICULO_ID";

        ResultSet res = this.conx.getStatement().executeQuery(query);

        ArrayList<Articulo> list = new ArrayList<>();

        while (res.next()) {
            Articulo art = new Articulo(this.conx);
            art.articuloId = res.getInt(1);
            art.articuloClave = res.getString(2);
            art.descripcion = res.getString(3);
            art.estatus = res.getInt(4);
            art.percent = res.getDouble(5);

            list.add(art);
        }

        return list;
    }

}
