interface user {
    email: string
    uid: string
    nombre: string
}

export class Usuario {
   
    static fromFireStore ({email, uid, nombre}:user){
        return new Usuario(uid,nombre,email)
    }

    constructor(
        public uid: string | undefined,
        public nombre: string,
        public email: string
    ) { }
}