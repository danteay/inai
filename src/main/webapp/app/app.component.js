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
var evaluacion_1 = require("./models/evaluacion");
var evaluacion_service_1 = require("./services/evaluacion.service");
var params_service_1 = require("./services/params.service");
require("rxjs/add/operator/switchMap");
var AppComponent = (function () {
    function AppComponent(evalServ, params) {
        this.evalServ = evalServ;
        this.params = params;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.params.getUrlVars()['id'];
        this.evalServ.getEvaluacion(id)
            .then(function (value) {
            console.log(value);
            _this.evaluacion = value;
        })
            .catch(function (err) {
            console.log(err);
            Promise.reject(err);
        });
    };
    return AppComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", evaluacion_1.Evaluacion)
], AppComponent.prototype, "evaluacion", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app-root.html',
        providers: [
            evaluacion_service_1.EvaluacionService,
            params_service_1.ParamsService
        ]
    }),
    __metadata("design:paramtypes", [evaluacion_service_1.EvaluacionService,
        params_service_1.ParamsService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map