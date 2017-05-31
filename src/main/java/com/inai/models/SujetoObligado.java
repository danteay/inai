package com.inai.models;


import com.inai.libs.DB;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SujetoObligado {

    public int sujetoObligadoId;
    public String titular;
    public String enlace;
    public String direccion;
    public String telefonos;
    public String portalInternet;
    public String correoWeb;
    public int tipoSujetoObligadoId;
    public String sujeto;
    public String usuario;
    public String password;
    public int articuloId;
    public int estatus;

    private transient DB conx;

    public SujetoObligado(DB conx) {
        this.conx = conx;
    }

    public SujetoObligado getBySujetoObligadoId(int id) throws SQLException {
        String query = "SELECT * FROM SUJETOS_OBLIGADOS WHERE SUJETO_OBLIGADO_ID = " + id;
        ResultSet res = this.conx.getStatement().executeQuery(query);
        res.next();

        this.sujetoObligadoId = res.getInt(1);
        this.titular = res.getString(2);
        this.enlace = res.getString(3);
        this.direccion = res.getString(4);
        this.telefonos = res.getString(5);
        this.portalInternet = res.getString(6);
        this.correoWeb = res.getString(7);
        this.tipoSujetoObligadoId = res.getInt(8);
        this.sujeto = res.getString(9);
        this.usuario = res.getString(10);
        this.password = res.getString(11);
        this.articuloId = res.getInt(12);
        this.estatus = res.getInt(13);

        return this;
    }

}
