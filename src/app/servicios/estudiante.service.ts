import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiantes } from '../modelos/estudiantes.model';
import { Usuario } from '../modelos/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  constructor( private http: HttpClient) { }

  listar(): Observable<Estudiantes[]>{
    return this.http.get<Estudiantes[]>("http://127.0.0.1:7777/estudiantes")
  }

  eliminar(id:string){
    return this.http.delete<Estudiantes>(`http://127.0.0.1:7777/estudiantes/${id}`)
  }

  crear(estudiante:Estudiantes){
    return this.http.post('http://127.0.0.1:7777/estudiantes',estudiante)
  }

  editar(id:string, estudiante:Estudiantes){
    return this.http.put('http://127.0.0.1:7777/estudiantes/'+id, estudiante)
  }

  getEstudiante(id:string): Observable<Estudiantes>{
    return this.http.get<Estudiantes>('http://127.0.0.1:7777/estudiantes/'+id)  
  }
}
