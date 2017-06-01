package com.inai.models;

import com.inai.libs.DB;
import com.inai.models.output.EvaluacionInfo;

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
    public int estatus;
    public String respuestas;
    public int tipoEvaluacion;
    public int cierre;
    public double resultado;

    private transient DB conx;

    public Evaluacion(DB conx) {
        this.conx = conx;
    }

    public EvaluacionInfo getByEvaluacionId(int id) throws SQLException {
        String query = "SELECT e.*, so.* FROM EVALUACIONES e, SUJETOS_OBLIGADOS so " +
                "WHERE e.SUJETO_OBLIGADO_ID = so.SUJETO_OBLIGADO_ID " +
                "AND e.EVALUACION_ID = " + id;

        ResultSet res = this.conx.getStatement().executeQuery(query);

        if (res.next()) {
            EvaluacionInfo info = new EvaluacionInfo();
            info.evaluacionId = res.getInt(1);
            info.periodoId = res.getInt(2);
            info.articuloId = res.getInt(4);
            info.fechaEvaluacion = res.getDate(5);
            info.usuarioEvalua = res.getString(6);
            info.estatus = res.getInt(7);
            info.respuestas = res.getString(8);
            info.tipoEvaluacion = res.getInt(9);
            info.cierre = res.getInt(10);
            info.resultado = res.getDouble(11);

            info.sujetoObligado = new SujetoObligado(this.conx);
            info.sujetoObligado.sujetoObligadoId = res.getInt(12);
            info.sujetoObligado.titular = res.getString(13);
            info.sujetoObligado.enlace = res.getString(14);
            info.sujetoObligado.direccion = res.getString(15);
            info.sujetoObligado.telefonos = res.getString(16);
            info.sujetoObligado.portalInternet = res.getString(17);
            info.sujetoObligado.correoWeb = res.getString(18);
            info.sujetoObligado.tipoSujetoObligadoId = res.getInt(19);
            info.sujetoObligado.sujeto = res.getString(20);
            info.sujetoObligado.usuario = res.getString(21);
            info.sujetoObligado.password = res.getString(22);
            info.sujetoObligado.articuloId = res.getInt(23);
            info.sujetoObligado.estatus = res.getInt(24);

            Articulo articulos = new Articulo(this.conx);
            info.articulos = articulos.getByEvaluacionId(id);

            return info;
        } else {
            return null;
        }
    }

    public void update(int id, float percent, boolean cierre) throws SQLException {
        String query = "UPDATE Evaluaciones SET resultado = "+percent+", fecha_evaluacion = CURRENT_DATE - 1";

        if (cierre) {
            query += " cierre = 1";
        }

        query += " WHERE evaluacion_id = " + id;

        this.conx.getStatement().executeQuery(query);
    }

    public void openEvaluacion(int id) throws SQLException {
        String query = "UPDATE Evaluaciones SET cierre = 0 WHERE evaluacion_id = " + id;
        this.conx.getStatement().executeQuery(query);
    }
}
