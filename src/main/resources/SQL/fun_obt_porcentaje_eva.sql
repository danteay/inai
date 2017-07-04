CREATE OR REPLACE FUNCTION fun_obt_porcentaje_Eva(
  pEvaluacion_Id NUMBER
)
  RETURN INTEGER IS
  nResultado NUMBER := 0;
  numAnswers NUMBER := 0;
  checked    NUMBER := 0;
  BEGIN

    SELECT count(afr.ART_FRACC_RESPUESTA_ID) INTO numAnswers
    FROM ART_FRACC_RESPUESTAS afr
    WHERE afr.ARTICULO_FRACCION_ID IN (

      SELECT af.ARTICULO_FRACCION_ID AS afid
      FROM EVALUACIONES_FRACCIONES ef
        INNER JOIN ARTICULOS_FRACCIONES af
          ON ef.ARTICULO_FRACCION_ID = af.ARTICULO_FRACCION_ID
      WHERE ef.EVALUACION_ARTICULO_ID IN (

        SELECT ea.EVALUACION_ARTICULO_ID as eaid
        FROM ARTICULOS art
          INNER JOIN EVALUACIONES_ARTICULOS ea
            ON art.ARTICULO_ID = ea.ARTICULO_ID
          INNER JOIN EVALUACIONES eval
            ON ea.EVALUACION_ID = eval.EVALUACION_ID
        WHERE eval.EVALUACION_ID = pEvaluacion_Id
      )
    )AND afr.ESTATUS = 1;

    SELECT count(def.DET_EVAL_FRACCION_ID) INTO checked
    FROM DET_EVAL_FRACCIONES def
      INNER JOIN (
                   SELECT afr.* FROM ART_FRACC_RESPUESTAS afr
                   WHERE afr.ARTICULO_FRACCION_ID IN (

                     SELECT af.ARTICULO_FRACCION_ID AS afid
                     FROM EVALUACIONES_FRACCIONES ef
                       INNER JOIN ARTICULOS_FRACCIONES af
                         ON ef.ARTICULO_FRACCION_ID = af.ARTICULO_FRACCION_ID
                     WHERE ef.EVALUACION_ARTICULO_ID IN (

                       SELECT ea.EVALUACION_ARTICULO_ID as eaid
                       FROM ARTICULOS art
                         INNER JOIN EVALUACIONES_ARTICULOS ea
                           ON art.ARTICULO_ID = ea.ARTICULO_ID
                         INNER JOIN EVALUACIONES eval
                           ON ea.EVALUACION_ID = eval.EVALUACION_ID
                       WHERE eval.EVALUACION_ID = 7544
                     )
                   ) AND afr.ESTATUS = 1
                 ) afr
        ON def.ART_FRACC_RESPUESTA_ID = afr.ART_FRACC_RESPUESTA_ID
    WHERE def.EVALUACION_FRACCION_ID IN (
      SELECT ef.EVALUACION_FRACCION_ID
      FROM EVALUACIONES_FRACCIONES ef
        INNER JOIN ARTICULOS_FRACCIONES af
          ON ef.ARTICULO_FRACCION_ID = af.ARTICULO_FRACCION_ID
      WHERE ef.EVALUACION_ARTICULO_ID IN (

        SELECT ea.EVALUACION_ARTICULO_ID as eaid
        FROM ARTICULOS art
          INNER JOIN EVALUACIONES_ARTICULOS ea
            ON art.ARTICULO_ID = ea.ARTICULO_ID
          INNER JOIN EVALUACIONES eval
            ON ea.EVALUACION_ID = eval.EVALUACION_ID
        WHERE eval.EVALUACION_ID = 7544
      )
    )
          AND def.RESPUESTA > 0;

    nResultado := (checked * 100) / numAnswers;

    RETURN nResultado;

  END fun_obt_porcentaje_Eva;
/
