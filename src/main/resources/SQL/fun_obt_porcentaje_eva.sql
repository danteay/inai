CREATE OR REPLACE FUNCTION fun_obt_porcentaje_Eva(
  evalId NUMBER
)
  RETURN NUMBER IS
    totalPercent NUMBER(22,2) := 0;
  BEGIN

    SELECT
      sum(FUN_OBT_PORC_ART_EVA(evalId, a.ARTICULO_ID)) / count(a.ARTICULO_ID) INTO totalPercent
    FROM
      ARTICULOS a,
      EVALUACIONES_ARTICULOS sa,
      EVALUACIONES e
    WHERE sa.EVALUACION_ID = e.EVALUACION_ID
          AND a.ARTICULO_ID = sa.ARTICULO_ID
          AND a.ESTATUS = 1
          AND e.EVALUACION_ID = evalId;

    RETURN totalPercent;

  END fun_obt_porcentaje_Eva;
/
