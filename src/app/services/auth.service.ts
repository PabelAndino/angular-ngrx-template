import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firesotre:AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      console.log(firebaseUser)
      console.log(firebaseUser?.uid)
      console.log(firebaseUser?.email)
      console.log(firebaseUser?.tenantId)
    })
  }

  crearUsuario(nombres: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      const newUser = new Usuario(user?.uid, nombres, email) //para postearlo a firebase para una coleccion
      return this.firesotre.doc(`${user?.uid}/usuario`).set({
        ...newUser
      })
    })
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  isAuth() {
    return this.auth.authState.pipe(//el obsevable no devuelve un boolean y lo muta pasando por el metodo map
      map(fbUser => fbUser != null)//permite tomar la informacion firebaseUser
      //si el firebaseUser es diferente de null va a regresar un true si no un false
    );
  }
}
