import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],//email: ['', [Validators.required, Validators.email]],
      password: [''] //password: ['', Validators.required]
    })
  }

  logearse() {
     Swal.fire({
       title: 'Espere porfavor!',
       didOpen: () => {
         Swal.showLoading()
       }
     })
 
     const { email, password } = this.loginForm.value
     this.auth.loginUsuario(email, password).
       then(returndata => {
         console.log(returndata)
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
6

    //Array Methods
    /* const items = [{ name: 'Bike', price: 100 },
    { name: 'TV', price: 200 },
    { name: 'ALBUM', price: 10 },
    { name: 'BOOK', price: 5 },
    { name: 'PHONE', price: 500 },
    { name: 'COMPUTER', price: 1000 },
    { name: 'KEYBOARD', price: 25 },]

    const itemsNumberArray = [2,6,4,9,33,2,66,12,7,9,2,1,66,6] */

    //Filter
    /* const filteredTimes = items.filter((item) => {
      return item.price <= 100
    })
    console.log(filteredTimes,'All') */
    //One Array on new Array AMP

    //MAP regresa un nuevo array
    /* const filteredTimes = items.map((item) => {
      return item.price
    })
    console.log(filteredTimes) */

    //FIND // encuentra algo
    /* const filteredTimes = items.find((item) => {
      return item.name === 'ALBUM'
    })
    console.log(filteredTimes) */


    //forEach
    /* items.forEach((item)=>{
      console.log(item.name)
    }) */

    //SOME return true or false
    /* const filteredTimes = items.some((item) => {
      return item.name === 'iPAD'
    })
    console.log(filteredTimes) */

    //EVERY busca en todo el array y mira si todos complen la condicion
    /* const filteredTimes = items.every((item) => {
      return item.price <= 1000//reegresa true porque todos lo items son menores a mil
    })
    console.log(filteredTimes) */

    //REDUCE para sumar el contenido de un array
    /* const filteredTimes = items.reduce((currentTotal, item) => {
      console.log(item.price + currentTotal)
      return item.price + currentTotal
    },0)//comienza en cero
    console.log(filteredTimes) */


    //INCLUDE // devuelve true or false
    /* const includesTwo = itemsNumberArray.includes(7)
    console.log(includesTwo) */
    



  }



}
