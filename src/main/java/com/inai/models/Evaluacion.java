package com.inai.models;

import com.inai.libs.DB;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

public class Evaluacion {

    public int evaluacionId;
    public int periodoId;
    public int sujetoObligadoId;
    public int articuloId;
    public Date fechaEvaluacion;
    public String usuarioEvalua;
    public int status;
    public String respuestas;
    public int tipoEvaluacion;
    public int cierre;
    public double resultado;

    private transient DB conx;

    public Evaluacion(DB conx) {
        this.conx = conx;
    }

    public Evaluacion getByEvaluacionId(int id) throws SQLException {
        String query = "SELECT * FROM Evaluaciones WHERE evaluacion_id = " + id;
        ResultSet res = this.conx.getStatement().executeQuery(query);
        res.next();

        this.evaluacionId = res.getInt(1);
        this.periodoId = res.getInt(2);
        this.sujetoObligadoId = res.getInt(3);
        this.articuloId = res.getInt(4);
        this.fechaEvaluacion = res.getDate(5);
        this.usuarioEvalua = res.getString(6);
        this.status = res.getInt(7);
        this.respuestas = res.getString(8);
        this.tipoEvaluacion = res.getInt(9);
        this.cierre = res.getInt(10);
        this.resultado = res.getDouble(11);

        return this;
    }

    public void update(float percent, boolean cierre) throws SQLException {
        String query = "UPDATE Evaluaciones SET resultado = "+percent+", fecha_evaluacion = CURRENT_DATE - 1";

        if (cierre) {
            query += " cierre = 1";
        }

        query += " WHERE evaluacion_id = " + this.evaluacionId;

        this.conx.getStatement().executeQuery(query);
    }

    public void openEvaluacion() throws SQLException {
        String query = "UPDATE Evaluaciones SET cierre = 0 WHERE evaluacion_id = " + this.evaluacionId;
        this.conx.getStatement().executeQuery(query);
    }
}
