package com.inai.models.output;


import com.inai.models.Articulo;
import com.inai.models.SujetoObligado;

import java.util.ArrayList;
import java.util.Date;

public class EvaluacionInfo {

    public int evaluacionId;
    public SujetoObligado sujetoObligado;
    public int periodoId;
    public int articuloId;
    public Date fechaEvaluacion;
    public String usuarioEvalua;
    public int estatus;
    public String respuestas;
    public int tipoEvaluacion;
    public int cierre;
    public double resultado;
    public ArrayList<Articulo> articulos;
}
