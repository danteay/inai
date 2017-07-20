package com.inai.models;


import com.inai.libs.DB;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Pregunta {

    public String descripcion;
    public int articuloFraccionId;
    public int evaluacionFraccionId;
    public double respuesta;
    public String comentario;
    public int estatus;

    private transient DB conx;

    public Pregunta(DB conx) {
        this.conx = conx;
    }

    /**
     * Return a list of questions for an especific article
     *
     * @param artId article ID
     * @param offset offset for page
     * @param limit limit items for page
     * @return List of questions for article
     * @throws SQLException error in sql execution
     */
    public ArrayList<Pregunta> getByArticuloFraccionId(int artId, int offset, int limit) throws SQLException {
        String query = "SELECT " +
            "  descripcion, " +
            "  afid, " +
            "  efid, " +
            "  resp, " +
            "  coment, " +
            "  estatus " +
            "  FROM ( " +
            "    SELECT " +
            "      descripcion, " +
            "      afid, " +
            "      efid, " +
            "      resp, " +
            "      coment, " +
            "      estatus, " +
            "      ROWNUM AS rnum " +
            "      FROM ( " +
            "        SELECT " +
            "          af.NUMERO || '. ' || af.DESCRIPCION AS descripcion, " +
            "          af.ARTICULO_FRACCION_ID AS afid, " +
            "          ef.EVALUACION_FRACCION_ID AS efid, " +
            "          ef.RESPUESTA AS resp, " +
            "          ef.COMENTARIO AS coment, " +
            "          af.ESTATUS AS estatus " +
            "          FROM EVALUACIONES_FRACCIONES ef, ARTICULOS_FRACCIONES af, EVALUACIONES_ARTICULOS ea " +
            "            WHERE ef.ARTICULO_FRACCION_ID = af.ARTICULO_FRACCION_ID " +
            "              AND ea.EVALUACION_ARTICULO_ID = ef.EVALUACION_ARTICULO_ID " +
            "              AND ea.ARTICULO_ID = " + artId + " " +
            "                ORDER BY af.ARTICULO_ID, af.NUMERO " +
            "      ) WHERE ROWNUM <= " + limit + " " +
            "  ) WHERE rnum > " + offset;

        ResultSet data = this.conx.getStatement().executeQuery(query);

        ArrayList<Pregunta> list = new ArrayList<>();
        while (data.next()) {
            Pregunta aux = new Pregunta(this.conx);
            aux.descripcion = data.getString(1);
            aux.articuloFraccionId = data.getInt(2);
            aux.evaluacionFraccionId = data.getInt(3);
            aux.respuesta = data.getDouble(4);
            aux.comentario = data.getString(5);
            aux.estatus = data.getInt(6);

            list.add(aux);
        }

        return list;
    }

    public int getTotalPreguntas(int artId) throws SQLException {
        String query = "SELECT count(af.ARTICULO_FRACCION_ID) " +
            "FROM EVALUACIONES_FRACCIONES ef, ARTICULOS_FRACCIONES af, EVALUACIONES_ARTICULOS ea " +
            "WHERE ef.ARTICULO_FRACCION_ID = af.ARTICULO_FRACCION_ID " +
            "AND ea.EVALUACION_ARTICULO_ID = ef.EVALUACION_ARTICULO_ID " +
            "AND ea.ARTICULO_ID = " + artId + " " +
            "ORDER BY af.ARTICULO_ID, af.NUMERO";

        ResultSet resp = this.conx.getStatement().executeQuery(query);

        if (resp.next()) {
            return resp.getInt(1);
        }

        return 0;
    }

}
