import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../modelos/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  usuario = new BehaviorSubject<Usuario>(new Usuario());
  constructor(private http: HttpClient, private router:Router) {
    this.verificarSesionActual();
  }

  /** Verificar si en el localStorage existe una sesión activa */
  verificarSesionActual(){
    let sesionActual = localStorage.getItem('sesion')
    if (sesionActual){
      this.setUsuario(JSON.parse(sesionActual));
    }
  }

  /** actualizar la información de la sesión del usuario que acaba de autenticar */
  setUsuario(user: Usuario){
    this.usuario.next(user)
  }

  /** obtener la información del usuario tal como token y id*/
  public get usuarioSesionActiva(): Usuario{
    return this.usuario.value;
  }

  /** obtener la información del usuario (id, token) */
  getUsuario(){
    return this.usuario.asObservable();
  }

  /** realiza una petición al api gateway para la autenticación del usuario */
  login(infoUsuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('http://127.0.0.1:7777/login',infoUsuario)
  }

  /** guarda los datos de respuesta de la petición de login al apigateway
   * en el local storage y actualiza la información de la sesión
   */
  guardarSesionDatos(datos: any){
    let data: Usuario ={
       _id: datos.user_id,
       token: datos.token,
    }
    localStorage.setItem('sesion',JSON.stringify(data))
    this.setUsuario(data)
  }

  /** cierra la sesión del usuario, a través de la eliminación de la información
   * de sesión del localStorage y inicializa un nuevo objeto Usuario en el comportamiento
   */
  logout(){
    localStorage.removeItem('sesion')
    this.setUsuario(new Usuario())
  }

  /** obtener verdadero o falso, dependiendo si hay una sesión activa o no */
  sesionExiste(){
    let sesionActual = localStorage.getItem('sesion')
    console.log(sesionActual)
    return (sesionActual) ? true : false
    
  }
}
