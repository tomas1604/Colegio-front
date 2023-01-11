import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SeguridadService } from '../servicios/seguridad.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public miSeguridadService: SeguridadService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.miSeguridadService.usuarioSesionActiva){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${this.miSeguridadService.usuarioSesionActiva.token}`
        }
      });  
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401){
          this.router.navigate(['/pages/dashboard'])
        }
        return throwError(err);
      })
    )
  }
}
