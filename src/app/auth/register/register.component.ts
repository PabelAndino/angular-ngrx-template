import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  registroForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  crearUsuario() {
    if (this.registroForm.invalid) return

    Swal.fire({
      title: 'Espere porfavor!',
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const { nombres, correo, password } = this.registroForm?.value

    this.authService.crearUsuario(nombres, correo, password).
      then(credentials => {
        console.log(credentials)
        Swal.close()
        this.router.navigate(['/'])
      }).
      catch(error =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.message}`,
          footer: '<a href="">Why do I have this issue?</a>'
        })
      )
  }

}
