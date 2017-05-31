package com.inai.models;


import com.inai.helpers.DBHelpers;
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

    public Articulo[] getByEvaluacionId(int id) throws SQLException {
        String query = "SELECT a.* FROM ARTICULOS a, SUJETOS_ARTICULOS sa, EVALUACIONES e " +
                "WHERE sa.SUJETO_OBLIGADO_ID = e.SUJETO_OBLIGADO_ID " +
                "AND a.ARTICULO_ID = sa.ARTICULO_ID " +
                "AND e.EVALUACION_ID = " + id + " " +
                "AND a.ESTATUS = 1 " +
                "ORDER BY a.ARTICULO_ID";

        ResultSet res = this.conx.getStatement().executeQuery(query);

        int length = DBHelpers.resultSetLength(res);
        System.out.println("=====>> List length: "+length);

        Articulo[] list = new Articulo[length];

        int i = 0;
        while (res.next()) {
            list[i] = new Articulo(this.conx);
            list[i].articuloId = res.getInt(1);
            list[i].articuloClave = res.getString(2);
            list[i].descripcion = res.getString(3);
            list[i].estatus = res.getInt(4);
            i++;
        }

        return list;
    }

}
