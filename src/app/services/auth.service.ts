import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { unsetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscripton: Subscription = new Subscription
  private _user!: Usuario | null;

  get user(){
    return this._user // para prevenir mutaciones deberia de ser return {...this._user}
  }

  constructor(public auth: AngularFireAuth, private firesotre: AngularFirestore, private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      //implement the servece ones it is succesfully
      if (firebaseUser) {
        this.userSubscripton = this.firesotre.doc(`${firebaseUser.uid}/usuario`).valueChanges().
          subscribe((firestoreUser: any) => { //preferiblemente remover el any y descomentar la linea 26
            const user = Usuario.fromFireStore(firestoreUser)
            //obtiene el usuario para mandarselo a ingreso-egreso.service
            this._user = user
            this.store.dispatch(authActions.setUser({ user }))
            //this.store.dispatch(authActions.setUser({user:{...firestoreUser as Usuario}}))
            
          })
      } else {
        this._user = null
    
        this.userSubscripton.unsubscribe()
        this.store.dispatch(authActions.unSetUser())
        this.store.dispatch(unsetItems())
      }
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
    //this.store.dispatch(authActions.unSetUser())
    return this.auth.signOut()
  }

  isAuth() {
    return this.auth.authState.pipe(//el obsevable no devuelve un boolean y lo muta pasando por el metodo map
      map(fbUser => fbUser != null)//permite tomar la informacion firebaseUser
      //si el firebaseUser es diferente de null va a regresar un true si no un false
    );
  }
}
