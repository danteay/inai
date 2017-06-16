import { Component } from '@angular/core';

@Component({
    selector: 'sujeto-obligado',
    template: `
    <div class="ui piled segment">
        <h2 class="ui header">Sujeto obligado</h2>
        <div class="ui divider"></div>
        <p>
            <b>Nombre:</b> {{sujeto}} <br/>
            <b>Portal:</b> {{portalInternet}} <br/>
            <b>Correo:</b> {{correoWeb}} <br/>
            <b>Direccion:</b> {{direccion}} <br/>
        </p>
    </div>
    `
})

export class SujetoObligado {
    sujetoObligadoId: number;
    titular: string;
    enlace: string;
    direccion: string;
    telefonos: string;
    portalInternet: string;
    correoWeb: string;
    tipoSujetoObligadoId: number;
    sujeto: string;
    usuario: string;

    constructor() {
        this.sujetoObligadoId = 1;
        this.titular = 'Eduardo Aguilar';
        this.enlace = 'https://asdasd.com';
        this.direccion = 'asdasdasdasdasdasdasdasdasdasdasdasdasdasd';
        this.telefonos = '1234567890';
        this.portalInternet = 'https://asdasd.com';
        this.correoWeb = 'asd@asd.com';
        this.tipoSujetoObligadoId = 1;
        this.sujeto = 'Aasdasd Aasdasd';
        this.usuario = 'asd';
    }
}