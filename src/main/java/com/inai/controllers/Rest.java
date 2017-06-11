package com.inai.controllers;

import com.inai.helpers.IOHelpers;
import com.inai.libs.DB;
import com.inai.models.*;
import com.inai.models.input.UpdateQuestion;
import com.inai.models.output.AnswersInfo;
import com.inai.models.output.EvaluacionInfo;
import com.inai.models.output.Pagination;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Path("/v1")
public class Rest {

    @GET
    @Path("/evaluaciones/{evaluacion_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getArticlesForEvaluation(@Context HttpServletRequest req, @PathParam("evaluacion_id") int id) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Evaluacion evaluacion = new Evaluacion(conx);
            EvaluacionInfo info = evaluacion.getByEvaluacionId(id);

            if (info == null) {
                code = 404;
            } else {
                resp.put("data", info);
            }

            System.out.println(resp);
            conx.close();
        } catch(Exception e) {
            e.printStackTrace();
            resp.put("error", e.getMessage());
            code = 500;
        }

        return IOHelpers.response(req, code, resp);
    }

    @GET
    @Path("/articulos/{articulo_id}/preguntas")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getQuestionsForArticles(@Context HttpServletRequest req, @PathParam("articulo_id") int id) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Pregunta preguntas = new Pregunta(conx);
            Pagination pagination = new Pagination();

            int total = preguntas.getTotalPreguntas(id);
            int page = 1;
            int totalElements = 10;

            if (req.getParameter("page") != null) {
                page = Integer.parseInt(req.getParameter("page")) >= 1 ?
                        Integer.parseInt(req.getParameter("page")) : page;
            }

            int pages = (int) Math.ceil((double)total / (double)totalElements);

            if (page > pages) {
                page = pages;
            }

            int limit = pages == 0 ? 0 : (page == 1 ? totalElements : page * totalElements);
            int offset = limit - totalElements;

            pagination.limit = totalElements;
            pagination.page = page;
            pagination.total = total;
            pagination.totalPages = pages;

            System.out.println(pagination);

            ArrayList<Pregunta> list = preguntas.getByArticuloFraccionId(id, offset, limit);
            System.out.println(list);

            resp.put("pagination", pagination);
            resp.put("data", list);

            conx.close();
        } catch(Exception e) {
            e.printStackTrace();
            resp.put("error", e.getMessage());
            code = 500;
        }

        return IOHelpers.response(req, code, resp);
    }

    @GET
    @Path("/preguntas/{pregunta_id}/respuestas")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAnswersForQuestion(@Context HttpServletRequest req, @PathParam("pregunta_id") int id) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Respuesta respuestas = new Respuesta(conx);

            AnswersInfo info = new AnswersInfo();
            info.adjetivos = respuestas.getAdjetivosByarticuloFraccionId(id);
            info.sustantivos = respuestas.getSustantivosByarticuloFraccionId(id);

            resp.put("data", info);

            conx.close();
        } catch(Exception e) {
            e.printStackTrace();
            resp.put("error", e.getMessage());
            code = 500;
        }

        return IOHelpers.response(req, code, resp);
    }

    @GET
    @Path("/incidencias")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIncidencias(@Context HttpServletRequest req) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Incidencia incidencias = new Incidencia(conx);

            resp.put("data", incidencias.getAll());
        } catch(Exception e) {
            e.printStackTrace();
            resp.put("error", e.getMessage());
            code = 500;
        }

        return IOHelpers.response(req, code, resp);
    }

    @PUT
    @Path("/respuestas/update_once")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateQuestion(@Context HttpServletRequest req, UpdateQuestion data) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Respuesta respuestas = new Respuesta(conx);

            respuestas.update(data);
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("error", e.getMessage());
            code = 500;
        }

        return IOHelpers.response(req, code, resp);
    }


}
