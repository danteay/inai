SELECT
  descripcion Descripcion,
  (SELECT
     Sum ( nvl( de.Respuesta,0))
   FROM DET_EVAL_FRACCIONES de
   WHERE de.EVALUACION_FRACCION_ID = ef.EVALUACION_FRACCION_ID
  ) Valor
  FROM EVALUACIONES_FRACCIONES ef, ARTICULOS_FRACCIONES af
    WHERE ef.ARTICULO_FRACCION_ID = af.ARTICULO_FRACCION_ID
      AND EVALUACION_ID = 7601
      AND af.ARTICULO_ID = 23
    ORDER BY numero;