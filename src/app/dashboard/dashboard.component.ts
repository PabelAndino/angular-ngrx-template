import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription = new Subscription
  ingresoSubs: Subscription = new Subscription

  constructor(private store: Store<AppState>, private service: IngresoEgresoService) { }
  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(filter(auth => auth.user != null))//filtra y si devuelve un false por ejemplo no pasa al subscribe
      .subscribe(({ user }) => {
        this.ingresoSubs = this.service.initIngresosEgresosListener(user?.uid)
        .subscribe((items:any) => {

          this.store.dispatch(setItems({ items: items }))
         // this.store.dispatch(setItems({ items: data }))
        })

      })
  }

  ngOnDestroy(): void {
    this.ingresoSubs?.unsubscribe()
    this.userSubs.unsubscribe()//por si nos vamos a otra ventana
  }
  

}
