package com.inai.controllers;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/v1")
public class Rest {

    @GET
    @Path("/evaluations/{eval_id}/articles")
    @Produces(MediaType.APPLICATION_JSON)
    public Object getArticlesForEvaluation(@PathParam("eval_id") int id) {
        return "{\"hola\":" + id + "}";
    }

}
