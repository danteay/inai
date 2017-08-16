package com.inai.controllers;

import com.inai.helpers.IOHelpers;
import com.inai.libs.DB;
import com.inai.models.*;
import com.inai.models.input.UpdateAnswerInfo;
import com.inai.models.output.AnswersInfo;
import com.inai.models.output.EvaluacionInfo;
import com.inai.models.output.Pagination;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
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
    @Path("/evaluaciones/{evalId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getArticlesForEvaluation(
        @Context HttpServletRequest req,
        @PathParam("evalId") int id
    ) {
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
    @Path("/evaluaciones/{evalId}/articulos/{artId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOneArticle(
        @Context HttpServletRequest req,
        @PathParam("evalId") int evalId,
        @PathParam("artId") int artId
    ) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Articulo art = new Articulo(conx);
            art.getByArticuloId(evalId, artId);

            resp.put("data", art);

            System.out.println(resp);
            conx.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("error", e.getMessage());
            code = 500;
        }

        return IOHelpers.response(req, code, resp);
    }

    @GET
    @Path("/evaluaciones/{evalId}/articulos/{artId}/preguntas")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getQuestionsForArticles(
        @Context HttpServletRequest req,
        @PathParam("evalId") int evalId,
        @PathParam("artId") int artId
    ) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Pregunta preguntas = new Pregunta(conx);
            Pagination pagination = new Pagination();

            int total = preguntas.getTotalPreguntas(artId);
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

            ArrayList<Pregunta> list = preguntas.getByArticuloFraccionId(artId, offset, limit);
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
    @Path("/evaluaciones/{evalId}/articulos/{artId}/preguntas/{questId}/respuestas")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAnswersForQuestion(
        @Context HttpServletRequest req,
        @PathParam("evalId") int evalId,
        @PathParam("artId") int artId,
        @PathParam("questId") int id
    ) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Respuesta respuestas = new Respuesta(conx);

            AnswersInfo info = new AnswersInfo();
            info.adjetivos = respuestas.getAdjetivosByarticuloFraccionId(evalId, id);
            info.sustantivos = respuestas.getSustantivosByarticuloFraccionId(evalId, id);

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
    public Response getIncidencias(
        @Context HttpServletRequest req
    ) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Incidencia incidencias = new Incidencia(conx);

            resp.put("data", incidencias.getAll());
            conx.close();
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
    public Response updateAnswer(
        @Context HttpServletRequest req,
        UpdateAnswerInfo data
    ) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Respuesta respuestas = new Respuesta(conx);

            respuestas.update(data);
            conx.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("error", e.getMessage());
            code = 500;
        }

        return IOHelpers.response(req, code, resp);
    }

    @PUT
    @Path("/respuestas/many")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateManyAnswers(
        @Context HttpServletRequest req,
        UpdateAnswerInfo data[]
    ) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Respuesta respuestas = new Respuesta(conx);

            for (UpdateAnswerInfo info : data) {
                respuestas.update(info);
            }

            conx.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("error", e.getMessage());
            code = 500;
        }

        return IOHelpers.response(req, code, resp);
    }

    @PUT
    @Path("/evaluacion/{evalId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response closeEvaluation(
        @Context HttpServletRequest req,
        @PathParam("evalId") int id
    ) {
        Map<String, Object> resp = new HashMap<>();
        int code = 200;

        try {
            DB conx = new DB();
            Evaluacion evaluaciones = new Evaluacion(conx);

            if (req.getParameter("status").equals("close")) {
                evaluaciones.close(id);
                resp.put("evalId", id);
            } else if (req.getParameter("status").equals("open")) {
                evaluaciones.open(id);
                resp.put("evalId", id);
            } else {
                code = 404;
                resp.put("error", "status not found");
            }

            conx.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("error", e.getMessage());
            code = 500;
        }

        return IOHelpers.response(req, code, resp);
    }
}
