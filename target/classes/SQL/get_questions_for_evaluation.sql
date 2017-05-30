select
  NUMERO || '. ' || DESCRIPCION Descripcion,
  af.ARTICULO_FRACCION_ID,
  ef.EVALUACION_FRACCION_ID,
  ef.RESPUESTA, ef.COMENTARIO,
  af.ESTATUS
  from EVALUACIONES_FRACCIONES ef, articulos_fracciones af
    where ef.ARTICULO_FRACCION_ID = af.ARTICULO_FRACCION_ID
      And EVALUACION_ID  = 12
      And af.ARTICULO_ID = 12
    order by af.ARTICULO_ID, af.NUMERO
