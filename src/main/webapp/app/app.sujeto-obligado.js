"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SujetoObligado = (function () {
    function SujetoObligado() {
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
    return SujetoObligado;
}());
SujetoObligado = __decorate([
    core_1.Component({
        selector: 'sujeto-obligado',
        template: "\n    <div class=\"ui piled segment\">\n        <h2 class=\"ui header\">Sujeto obligado</h2>\n        <div class=\"ui divider\"></div>\n        <p>\n            <b>Nombre:</b> {{sujeto}} <br/>\n            <b>Portal:</b> {{portalInternet}} <br/>\n            <b>Correo:</b> {{correoWeb}} <br/>\n            <b>Direccion:</b> {{direccion}} <br/>\n        </p>\n    </div>\n    "
    }),
    __metadata("design:paramtypes", [])
], SujetoObligado);
exports.SujetoObligado = SujetoObligado;
//# sourceMappingURL=app.sujeto-obligado.js.map