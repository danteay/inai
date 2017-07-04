package com.inai.models;


import com.inai.libs.DB;
import com.inai.models.input.UpdateQuestion;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Respuesta {

    public int artFraccRespuestaId;
    public int articuloFraccionId;
    public String respuesta;
    public double valor;
    public int orden;
    public int status;
    public int tipoCriterioId;
    public int checked;

    private transient DB conx;

    public Respuesta(DB conx) {
        this.conx = conx;
    }

    /**
     * Get Answers of Adjective type for a question
     *
     * @param afId Question articuloFraccionId
     * @param eval Evaluation ID
     * @return ArrayList of Respuesta objects
     * @throws SQLException Execution error in query
     */
    public ArrayList<Respuesta> getAdjetivosByarticuloFraccionId(int eval, int afId) throws SQLException {
        String query = "SELECT " +
            "aux.*, " +
            "(\n" +
            "  CASE WHEN def.RESPUESTA > 0 THEN 1 " +
            "    ELSE 0 " +
            "  END " +
            ") AS checked " +
            "FROM DET_EVAL_FRACCIONES def, ( " +
            "  SELECT " +
            "    afr.ART_FRACC_RESPUESTA_ID, " +
            "    afr.ARTICULO_FRACCION_ID, " +
            "    afr.RESPUESTA, " +
            "    afr.VALOR, " +
            "    afr.ORDEN, " +
            "    afr.ESTATUS, " +
            "    afr.TIPO_CRITERIO_ID, " +
            "    ef.EVALUACION_FRACCION_ID " +
            "  FROM EVALUACIONES_FRACCIONES ef " +
            "    INNER JOIN ART_FRACC_RESPUESTAS afr " +
            "      ON ef.ARTICULO_FRACCION_ID = afr.ARTICULO_FRACCION_ID " +
            "  WHERE ef.EVALUACION_ID = " + eval + " " +
            "        AND afr.ARTICULO_FRACCION_ID = " + afId + " " +
            ") aux " +
            "WHERE def.EVALUACION_FRACCION_ID = aux.EVALUACION_FRACCION_ID" +
            "  AND def.ART_FRACC_RESPUESTA_ID = aux.ART_FRACC_RESPUESTA_ID" +
            "  ORDER BY aux.ORDEN";

        ResultSet res = this.conx.getStatement().executeQuery(query);

        return this.populateList(res);
    }

    /**
     * Get Answers of Substantive type for a question
     *
     * @param afId Question articuloFraccionId
     * @return ArrayList of Respuesta objects
     * @throws SQLException Execution error in query
     */
    public ArrayList<Respuesta> getSustantivosByarticuloFraccionId(int afId) throws SQLException {
        String query = "SELECT * FROM ART_FRACC_RESPUESTAS " +
                "WHERE ARTICULO_FRACCION_ID = " + afId + " " +
                "AND TIPO_CRITERIO_ID = 2 " +
                "ORDER BY ORDEN";

        ResultSet res = this.conx.getStatement().executeQuery(query);

        return this.populateList(res);
    }

    /**
     * Generator for list of aswers
     *
     * @param res ResultSet of previews query statement
     * @return ArrayList of Respuesta objects
     * @throws SQLException Execution error in query
     */
    private ArrayList<Respuesta> populateList(ResultSet res) throws SQLException {
        ArrayList<Respuesta> list = new ArrayList<>();

        while (res.next()) {
            Respuesta aux = new Respuesta(this.conx);
            aux.artFraccRespuestaId = res.getInt(1);
            aux.articuloFraccionId = res.getInt(2);
            aux.respuesta = res.getString(3);
            aux.valor = res.getDouble(4);
            aux.orden = res.getInt(5);
            aux.status = res.getInt(6);
            aux.tipoCriterioId = res.getInt(7);

            list.add(aux);
        }

        return list;
    }

    /**
     * Update answer information.
     *
     * @param info object with the request information
     * @throws SQLException Execution statement query failed
     */
    public void update(UpdateQuestion info) throws SQLException {
        String query = "CALL java_update_answers(" +
            info.respuesta + "," +
            info.evaluacionFraccionId + "," +
            info.artfraccRespuestaId + "," +
            "'" + info.comentario + "')";

        ResultSet res = this.conx.getStatement().executeQuery(query);
        res.next();

        if (res.getInt(1) != 1) {
          throw new SQLException("Update query error.");
        }
    }

    /**
     * Update batch of info for quiestions
     *
     * @param info array of info update
     * @throws SQLException Exeption in sql execution
     */
    public void updateMany(UpdateQuestion[] info) throws SQLException {
        for (UpdateQuestion data: info) {
            this.update(data);
        }
    }

}
