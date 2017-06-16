"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TopNav = (function () {
    function TopNav() {
        this.totalPercent = 0;
    }
    return TopNav;
}());
TopNav = __decorate([
    core_1.Component({
        selector: 'top-nav',
        template: "\n    <div class=\"ui fixed inverted menu\">\n      <div class=\"ui container\">\n        <a href=\"#\" class=\"header item\">\n          <img class=\"logo\" src=\"http://www.lja.mx/wp-content/uploads/2016/05/inai.png\">\n        </a>\n        \n        <a href=\"#\" class=\"item right\">Porcentaje {{totalPercent}} %</a>\n      \n        <div class=\"ui simple dropdown item right\">\n          Acciones <i class=\"dropdown icon\"></i>\n          <div class=\"menu\">\n            <a class=\"item\" href=\"#\">Seleccionar todo</a>\n            <a class=\"item\" href=\"#\">Limpiar verificaci\u00F3n</a>\n            <a href=\"#\" class=\"item\">No publica portal de internet</a>\n            <a href=\"#\" class=\"item\">Recalcular total</a>\n          </div>\n        </div>\n      </div>\n    </div>\n    "
    })
], TopNav);
exports.TopNav = TopNav;
//# sourceMappingURL=top-nav.component.js.map