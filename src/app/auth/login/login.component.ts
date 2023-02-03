import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscribable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],//email: ['', [Validators.required, Validators.email]],
      password: [''] //password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
      console.log('Cargando Subs')
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }

  logearse() {
    if (this.loginForm.invalid) { return }
    this.store.dispatch(ui.isLoading())
    /* Swal.fire({
      title: 'Espere porfavor!',
      didOpen: () => {
        Swal.showLoading()
      }
    }) */

    const { email, password } = this.loginForm.value
    this.auth.loginUsuario(email, password).
      then(returndata => {
        //Swal.close()
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/'])
      }).
      catch(error => {
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.message}`,
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
      )




  }



}
