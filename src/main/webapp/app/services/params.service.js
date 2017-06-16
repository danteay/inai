"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ParamsService = (function () {
    function ParamsService() {
    }
    ParamsService.prototype.getUrlVars = function () {
        var vars = {};
        var parts;
        parts = window.location.href.split('?');
        console.log(parts);
        if (parts.length >= 2) {
            var data = parts[1].split('&');
            console.log(data);
            for (var part in data) {
                console.log(part);
                var aux = part.split('=');
                console.log(aux);
                vars[aux[0]] = aux[1];
            }
        }
        return vars;
    };
    return ParamsService;
}());
ParamsService = __decorate([
    core_1.Injectable()
], ParamsService);
exports.ParamsService = ParamsService;
//# sourceMappingURL=params.service.js.map