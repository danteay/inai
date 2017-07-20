CREATE OR REPLACE PACKAGE BODY javapkg AS
  PROCEDURE update_answer(
    eval NUMBER,
    resp NUMBER,
    efId NUMBER,
    afrId NUMBER,
    coment VARCHAR2,
    percent FLOAT
  ) AS
    BEGIN

      UPDATE DET_EVAL_FRACCIONES SET
        RESPUESTA = resp,
        COMENTARIO = coment
      WHERE EVALUACION_FRACCION_ID = efId
            AND ART_FRACC_RESPUESTA_ID = afrId;

      UPDATE EVALUACIONES_FRACCIONES SET
        COMENTARIO = coment,
        RESPUESTA = resp
      WHERE EVALUACION_FRACCION_ID = efId;

      UPDATE EVALUACIONES SET
        RESULTADO = percent,
        fecha_evaluacion = CURRENT_DATE - 1
      WHERE EVALUACION_ID = eval;

      COMMIT ;

      EXCEPTION
        WHEN OTHERS THEN
          ROLLBACK;
          RAISE;
    END update_answer;
END ;
/
