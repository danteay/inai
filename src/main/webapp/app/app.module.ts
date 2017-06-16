import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { SujetoObligado } from './sujeto-obligado/sujeto-obligado.component';
import { TopNav } from './top-nav/top-nav.component'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        TopNav,
        SujetoObligado,
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
