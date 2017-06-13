import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { TopNav }  from './app.top-nav';
import { SujetoObligado } from './app.sujeto-obligado';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule // <-- import the FormsModule before binding with [(ngModel)]
    ],
    declarations: [
        TopNav,
        SujetoObligado
    ],
    bootstrap: [
        TopNav,
        SujetoObligado
    ]
})
export class AppModule { }
