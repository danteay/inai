import { Component } from '@angular/core';


@Component({
    selector: 'top-nav',
    template: `
    <div class="ui fixed inverted menu">
      <div class="ui container">
        <a href="#" class="header item">
          <img class="logo" src="http://www.lja.mx/wp-content/uploads/2016/05/inai.png">
        </a>
        
        <a href="#" class="item right">Porcentaje {{totalPercent}} %</a>
      
        <div class="ui simple dropdown item right">
          Acciones <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item" href="#">Seleccionar todo</a>
            <a class="item" href="#">Limpiar verificación</a>
            <a href="#" class="item">No publica portal de internet</a>
            <a href="#" class="item">Recalcular total</a>
          </div>
        </div>
      </div>
    </div>
    `
})
export class TopNav {
    totalPercent = 0;
}
