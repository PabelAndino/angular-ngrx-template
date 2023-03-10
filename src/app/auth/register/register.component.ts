import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm!: FormGroup;
  uiSubscriptions: Subscription = new Subscription
  loading:boolean = false
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.uiSubscriptions = this.store.select('ui').subscribe(ui=>{
      this.loading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.uiSubscriptions.unsubscribe()
  }
  crearUsuario() {
    if (this.registroForm.invalid) return
    this.store.dispatch(ui.isLoading())
    /* Swal.fire({
      title: 'Espere porfavor!',
      didOpen: () => {
        Swal.showLoading()
      }
    }) */

    const { nombres, correo, password } = this.registroForm?.value

    this.authService.crearUsuario(nombres, correo, password).
      then(credentials => {
        console.log(credentials)
        //Swal.close()
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/'])
      }).
      catch(error =>{
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.message}`,
          footer: '<a href="">Why do I have this issue?</a>'
        })}
      )
  }

}
