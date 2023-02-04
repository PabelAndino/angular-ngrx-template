import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm!: FormGroup;
  tipo: string = 'ingreso'
  cargando: boolean = false
  loadingSubs: Subscription = new Subscription

  constructor(private formBuilder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe(({ isLoading }) => this.cargando = isLoading)
    this.ingresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],

    })
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }

  guardar() {
    this.store.dispatch(isLoading())
    const { descripcion, monto } = this.ingresoForm.value
    if (this.ingresoForm.invalid) return
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo)
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset()
        this.store.dispatch(stopLoading())
        Swal.fire('Registro Creado', descripcion, 'success')
      })
      .catch(error => {
        this.store.dispatch(stopLoading())
        Swal.fire("Error", error.message, 'error')
      })

  }


}
