import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {
  
  ingresos:number = 0
  egresos:number = 0

  totalEgresos:number = 0
  totalIngresos:number = 0


  constructor (private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
    .subscribe(({items})=> this.generarEstadistica(items))
  }
  
  generarEstadistica(items:IngresoEgreso[]){
    for (const item of items) {
      if(item.tipo === 'ingreso'){
        this.totalIngresos +=item.monto
        this.ingresos ++
      }else{
        this.totalEgresos += item.monto;
        this.egresos ++
      }
    }
  }

}
