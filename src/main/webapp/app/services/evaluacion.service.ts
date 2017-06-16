
import { Evaluacion } from '../models/evaluacion';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/add/operator/toPromise";

@Injectable()
export class EvaluacionService {

    constructor(
        private http: Http
    ){}

    getEvaluacion(id: any) : Promise<Evaluacion> {
        return this.http.get('/api/v1/evaluacion/'+id)
            .toPromise()
            .then(resp => {
                console.log(resp);
                return resp.json() as Evaluacion;
            })
            .catch(err => {
                console.log(err);
                return Promise.reject(err.message || err);
            });
    }

}