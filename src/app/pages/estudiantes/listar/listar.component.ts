import { Component, OnInit } from '@angular/core';
import { Estudiantes } from '../../../modelos/estudiantes.model';
import { EstudianteService } from '../../../servicios/estudiante.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  estudiantes: Estudiantes[];
  nombresColumnas: string[] = ["Cédula","Nombre","Apellido","Opciones"];
  constructor(private miEstudianteService: EstudianteService,
              private router: Router, private miSeguridadService:SeguridadService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.miEstudianteService.listar().subscribe(
      data =>{
        this.estudiantes = data;
      },
      err=>{
        Swal.fire({
          title:'Permiso Denegado',
          text: 'No tiene permisos suficientes para esta funcionalidad',
          icon:'warning'
        })
        if(this.miSeguridadService.sesionExiste()){
          this.router.navigate(['/pages/dashboard'])
        }
        else{
          this.router.navigate(['/pages/seguridad/login'])
        }
        
        
      }
  )};

  agregar():void{
    this.router.navigate(['/pages/estudiantes/crear'])
  }

  editar(id:string){
    this.router.navigate(['/pages/estudiantes/actualizar/'+id])
  }

  eliminar(id:string): void{
    Swal.fire({
      title:'Eliminación de estudiante',
      text:'¿Está seguro que desea eliminar el estudiante?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor:'#8CDE5D',
      confirmButtonText:'Si, eliminar',
      cancelButtonColor: '#EE2408',
      cancelButtonText:'Cancelar'
    }).then((result) =>{
      if (result.isConfirmed){
        this.miEstudianteService.eliminar(id).subscribe(
          data =>{
            this.ngOnInit();
            Swal.fire({
              title:'Eliminación de estudiante',
              text:'El estudiante se ha eliminado de manera correcta',
              icon:'success'
            })  
          }
        )  
      }
    })
  }

}
