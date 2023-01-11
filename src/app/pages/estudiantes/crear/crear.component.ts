import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Estudiantes } from '../../../modelos/estudiantes.model';
import { EstudianteService } from '../../../servicios/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion:boolean = true;
  id_estudiante:string ="";
  intentoEnvio:boolean = false;
  estudiante: Estudiantes ={
    cedula:"",
    nombre:"",
    apellido:""
  }
  constructor(private miEstudianteService: EstudianteService,
              private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_estudiante){
      this.modoCreacion = false;
      this.id_estudiante = this.rutaActiva.snapshot.params.id_estudiante
      this.getEstudiante(this.id_estudiante)
    }else{
      this.modoCreacion= true;
    }
  }

  getEstudiante(id:string){
    this.miEstudianteService.getEstudiante(id).subscribe(
      data =>{
        this.estudiante = data 
      }  
  )
  }

  validarDatos():boolean{
    this.intentoEnvio = true;
    if(this.estudiante.cedula == '' || this.estudiante.nombre == ''||
    this.estudiante.apellido == '' ){
      return false;
    }else{
      return true
    }   
  }

  agregar():void{
    if(this.validarDatos()){
      this.intentoEnvio = true;
      this.miEstudianteService.crear(this.estudiante).subscribe(
        data=>{          
          Swal.fire({
            title:'Agregando estudiante',
            text: 'El estudiante se agregó de manera correcta',
            icon:'success'
          })
          this.router.navigate(['pages/estudiantes/listar'])
        }
      )
    }
  }

  editar():void{
    if (this.validarDatos()){
      this.miEstudianteService.editar(this.estudiante._id,this.estudiante).subscribe(
        data=>{
          Swal.fire({
            title:'Actualizando estudiante',
            text:'El estudiante se actualizó de manera correcta',
            icon:'success'
          })
          this.router.navigate(['pages/estudiantes/listar'])
        }
      )
    }
  }

}
