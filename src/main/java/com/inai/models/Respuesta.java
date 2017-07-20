package com.inai.models;


import com.inai.libs.DB;
import com.inai.models.input.UpdateAnswerInfo;

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
    public int evaluacionFraccionId;
    public int checked;

    private transient DB conx;

    public Respuesta(DB conx) {
        this.conx = conx;
    }

    /**
     * Get Answers of Adjective type for a question
     *
     * @param evalId Evaluation ID
     * @param questId Question articuloFraccionId
     * @return ArrayList of Respuesta objects
     * @throws SQLException Execution error in query
     */
    public ArrayList<Respuesta> getAdjetivosByarticuloFraccionId(int evalId, int questId) throws SQLException {
        String query = "SELECT " +
            "aux.*, " +
            "(" +
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
            "  WHERE ef.EVALUACION_ID = " + evalId + " " +
            "        AND afr.ARTICULO_FRACCION_ID = " + questId + " " +
            "        AND afr.TIPO_CRITERIO_ID = 2 " +
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
     * @param evalId Evaluation ID
     * @param questId Question articuloFraccionId
     * @return ArrayList of Respuesta objects
     * @throws SQLException Execution error in query
     */
    public ArrayList<Respuesta> getSustantivosByarticuloFraccionId(int evalId, int questId) throws SQLException {
        String query = "SELECT " +
                "aux.*, " +
                "(" +
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
                "  WHERE ef.EVALUACION_ID = " + evalId + " " +
                "        AND afr.ARTICULO_FRACCION_ID = " + questId + " " +
                "        AND afr.TIPO_CRITERIO_ID = 1 " +
                ") aux " +
                "WHERE def.EVALUACION_FRACCION_ID = aux.EVALUACION_FRACCION_ID" +
                "  AND def.ART_FRACC_RESPUESTA_ID = aux.ART_FRACC_RESPUESTA_ID" +
                "  ORDER BY aux.ORDEN";

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
            aux.evaluacionFraccionId = res.getInt(8);
            aux.checked = res.getInt(9);

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
    public void update(UpdateAnswerInfo info) throws SQLException {
        String query = "CALL JAVAPKG.UPDATE_ANSWER(" +
            info.evaluacionId + "," +
            info.respuesta + "," +
            info.evaluacionFraccionId + "," +
            info.artfraccRespuestaId + "," +
            "'" + info.comentario + "')";

        System.out.println(query);
        System.out.println(this.conx.getStatement().execute(query));
    }

    /**
     * Update batch of info for quiestions
     *
     * @param info array of info update
     * @throws SQLException Exeption in sql execution
     */
    public void updateMany(UpdateAnswerInfo[] info) throws SQLException {
        for (UpdateAnswerInfo data: info) {
            this.update(data);
        }
    }

}
