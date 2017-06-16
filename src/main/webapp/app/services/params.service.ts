import { Injectable } from '@angular/core';

@Injectable()
export class ParamsService {

     getUrlVars() : any {
        let vars = {};
        let parts: string[];
        parts = window.location.href.split('?');

        console.log(parts);

        if (parts.length >= 2) {
            let data: string[] = parts[1].split('&');
            console.log(data);

            for (let part in data) {
                console.log(part);

                let aux = part.split('=');

                console.log(aux);

                vars[aux[0]] = aux[1];
            }
        }

        return vars;
    }


}
