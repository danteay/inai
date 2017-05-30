package com.inai.controllers;

import com.inai.helpers.IOHelpers;
import com.inai.libs.DB;

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

@Path("/v1")
public class Rest {

    @GET
    @Path("/evaluations/{eval_id}/info")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getArticlesForEvaluation(@Context HttpServletRequest req, @PathParam("eval_id") int id) {
        return IOHelpers.response(req,200, null);
    }

}
