import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fireStore: AngularFirestore, private service: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.service.user?.uid
    delete ingresoEgreso.uid
    return this.fireStore.doc(`${uid}/ingresos-egresos`).
      collection('items').
      add({ ...ingresoEgreso })//no puiede ser una instancia de una clase ({ingresoEgreso})
    //(...)solo manda las propiedades del mismo ({...ingresoEgreso})

  }

  initIngresosEgresosListener(uid?: string) {
   return this.fireStore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(map(snapshots =>
        //lo que se retorne de aqui sera los datos que recibira el subscribe
        snapshots.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as Object
        }))
      ))
      
  }

  borrarIngresoEgreso(uidItem?:string){
    const uidUser = this.service.user?.uid
    return this.fireStore.doc(`${uidUser}/ingresos-egresos/items/${uidItem}`).delete()
  }

}
