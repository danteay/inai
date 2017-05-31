package com.inai.helpers;


import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Response;

public class IOHelpers {

    public static Response response(HttpServletRequest req, int code, Map<String, Object> extras) {
        Map<String, Object> response = new HashMap<>();

        String path = req.getRequestURI();
        String query = req.getQueryString();

        if (query != null && !query.equals("")) {
            path += "?" + query;
        }

        response.put("path", path);
        response.put("request", System.currentTimeMillis());

        if (code <= 0) {
            response.put("code", 500);
        }

        response.put("code", code);

        if (code >= 200 && code < 300) {
            response.put("type", "success");
        } else {
            response.put("type", "error");
        }

        if (extras != null && extras.size() > 0) {
            for (Map.Entry<String, Object> entry : extras.entrySet()) {
                response.put(entry.getKey(), entry.getValue());
            }
        }

        String json = new Gson().toJson(response);

        return Response
                .status((int)response.get("code"))
                .entity(json)
                .build();
    }

}
