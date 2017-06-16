import { Component, Input, OnInit } from '@angular/core';

import { Evaluacion } from './models/evaluacion';
import { EvaluacionService } from './services/evaluacion.service';
import { ParamsService } from './services/params.service';

import "rxjs/add/operator/switchMap";

@Component({
    selector: 'app-root',
    templateUrl: './app-root.html',
    providers: [
        EvaluacionService,
        ParamsService
    ]
})

export class AppComponent implements OnInit{

    @Input() evaluacion: Evaluacion;

    constructor(
        private evalServ: EvaluacionService,
        private params: ParamsService
    ) {}

    ngOnInit(){
        let id = this.params.getUrlVars()['id'];
        this.evalServ.getEvaluacion(id)
            .then(value => {
                console.log(value);
                this.evaluacion = value;
            })
            .catch(err => {
                console.log(err);
                Promise.reject(err);
            });
    }

}
