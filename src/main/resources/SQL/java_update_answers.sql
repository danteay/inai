-- MAIN JAVA PACKAGE
CREATE OR REPLACE PACKAGE javapkg AS
  PROCEDURE update_answer(
    eval NUMBER,
    resp NUMBER,
    efId NUMBER,
    afrId NUMBER,
    coment VARCHAR2
  );

  PROCEDURE update_percent_eval(
    eval NUMBER
  );
END javapkg;

CREATE OR REPLACE PACKAGE BODY javapkg AS
  PROCEDURE update_answer(
    eval NUMBER,
    resp NUMBER,
    efId NUMBER,
    afrId NUMBER,
    coment VARCHAR2
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

      update_percent_eval(eval);

      COMMIT;

      EXCEPTION WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
    END update_answer;

  PROCEDURE update_percent_eval(
    eval NUMBER
  ) AS
      subtotal FLOAT;
    BEGIN
      -- GET PERCENT EVAL
      subtotal := FUN_OBT_PORCENTAJE_EVA(eval);

      UPDATE EVALUACIONES SET
        RESULTADO = subtotal
      WHERE EVALUACION_ID = eval;

      COMMIT;

      EXCEPTION WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
    END update_percent_eval;
END javapkg;
