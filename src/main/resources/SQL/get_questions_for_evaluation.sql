SELECT
  descripcion,
  afid,
  efid,
  resp,
  coment,
  estatus
FROM (
  SELECT
    descripcion,
    afid,
    efid,
    resp,
    coment,
    estatus,
    ROWNUM AS rnum
  FROM (
    SELECT
      af.NUMERO || '. ' || af.DESCRIPCION AS descripcion,
      af.ARTICULO_FRACCION_ID AS afid,
      ef.EVALUACION_FRACCION_ID AS efid,
      ef.RESPUESTA AS resp,
      ef.COMENTARIO AS coment,
      af.ESTATUS AS estatus
    FROM EVALUACIONES_FRACCIONES ef, ARTICULOS_FRACCIONES af, EVALUACIONES_ARTICULOS ea
    WHERE ef.ARTICULO_FRACCION_ID = af.ARTICULO_FRACCION_ID
      AND ea.EVALUACION_ARTICULO_ID = ef.EVALUACION_ARTICULO_ID
      AND ea.ARTICULO_ID = 7
    ORDER BY af.ARTICULO_ID, af.NUMERO
  ) WHERE ROWNUM <= 20
) WHERE rnum > 10;