CREATE OR REPLACE FUNCTION fun_obt_porc_art_eva(
  pEvaluacion_Id NUMBER,
  pArticulo_Id   NUMBER
) RETURN INTEGER IS
  nResultado NUMBER := 0;
  numAnswers NUMBER := 0;
  cheked     NUMBER := 0;
BEGIN
  -- COUNT TOTAL OF ANSWERS
  SELECT count(afr.ART_FRACC_RESPUESTA_ID) INTO numAnswers
  FROM ART_FRACC_RESPUESTAS afr
  WHERE afr.ARTICULO_FRACCION_ID IN (
    SELECT af.ARTICULO_FRACCION_ID
    FROM ARTICULOS_FRACCIONES af
      INNER JOIN EVALUACIONES_ARTICULOS ea
        ON ea.ARTICULO_ID = af.ARTICULO_ID
    WHERE ea.EVALUACION_ID = pEvaluacion_Id
          AND af.ARTICULO_ID = pArticulo_Id
  ) AND afr.ESTATUS = 1;

  -- COUNT CHECKED ANSWERS
  SELECT count(def.DET_EVAL_FRACCION_ID) INTO cheked
  FROM DET_EVAL_FRACCIONES def
    INNER JOIN (
                 SELECT afr.* FROM ART_FRACC_RESPUESTAS afr
                 WHERE afr.ARTICULO_FRACCION_ID IN (
                   SELECT af.ARTICULO_FRACCION_ID
                   FROM ARTICULOS_FRACCIONES af
                     INNER JOIN EVALUACIONES_ARTICULOS ea
                       ON ea.ARTICULO_ID = af.ARTICULO_ID
                   WHERE ea.EVALUACION_ID = pEvaluacion_Id
                         AND af.ARTICULO_ID = pArticulo_Id
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
      WHERE eval.EVALUACION_ID = pEvaluacion_Id
    )
  )
        AND def.RESPUESTA > 0;

  nResultado := (cheked * 100) / numAnswers;

  RETURN nResultado;

END fun_obt_porc_art_eva;
/
