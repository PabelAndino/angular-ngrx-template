import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGardGuard implements CanActivate, CanMatch {
  constructor(private authService: AuthService, private router:Router){}
  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(tap(estado=>{
      if(!estado){
        this.router.navigate(['/login'])
      }
    }));//el tap es un efecto secundario
  }

  canMatch(): Observable<boolean> {
  return this.authService.isAuth().pipe(tap(estado => {
    if (!estado) {
      this.router.navigate(['/login'])
    }
  }), take(1)

  );//el tap es un efecto secundario
}

 

}
