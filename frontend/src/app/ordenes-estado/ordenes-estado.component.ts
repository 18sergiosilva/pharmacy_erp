import { Component, OnInit } from '@angular/core';
import { OrdenesEstadoService } from "../services/ordenes-estado.service";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ordenes-estado',
  templateUrl: './ordenes-estado.component.html',
  styleUrls: ['./ordenes-estado.component.scss']
})
export class OrdenesEstadoComponent implements OnInit {

  constructor(private router: Router, private servicioOrdenesEstado: OrdenesEstadoService, private toastr: ToastrService,private http: HttpClient) { }

  ordenes = [];

  dispo = true;

  ngOnInit() {
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    this.getOrdenes(userLog,idLog);
  }

  getOrdenes(user,id) {
    this.servicioOrdenesEstado
      .obtenerOrdenes(user,id)
      .pipe(first())
      .subscribe(
        (data) => {
          this.ordenes = data
        },
        (error) => {
          console.log(error)
        }
      );
  }

  putOrdenes(id,estado) {
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    this.servicioOrdenesEstado
      .putOrdenes(id,estado,userLog,idLog)
      .pipe(first())
      .subscribe(
        (data) => {
          if(data.codigoEstado == 200)
          {
            let userLog = localStorage.getItem("user");
            let idLog = localStorage.getItem("userid");
            this.getOrdenes(userLog,idLog);
          }
        },
        (error) => {
          if(error.status == 404 || error.status == 400 || error.status == 500)
          {
            Swal.fire({
              text: 'Error! No se puede modificar el estado de la orden',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            })
          }
        }
      );
  }


  onClickDis(){
    if (this.dispo){
      console.log("Espacios Disponibles");
      
      let resp = this.http.post("https://d94i6l2i2l.execute-api.us-west-2.amazonaws.com/disp",
      {
        
        "estado":false

      }).toPromise().then((data: any) => {
        this.dispo = false;
        this.toastr.success('ALERTA', "Espacios Disponibles");
      }).catch((error: any) =>{
        this.toastr.success('¡ALERTA!', "NO SE HA PODIDO CAMBIAR LA DISPONIBILIDAD A ESPACIOS DISPONIBLES");
        console.log(error);
      })

    } else {
      console.log("Restaurante Lleno");

      let resp = this.http.post("https://d94i6l2i2l.execute-api.us-west-2.amazonaws.com/disp",
      {
        
        "estado":true

      }).toPromise().then((data: any) => {
        this.dispo = true;
        this.toastr.success('ALERTA', "Restaurante Lleno");
      }).catch((error: any) =>{
        this.toastr.success('¡ALERTA!', "NO SE HA PODIDO CAMBIAR LA DISPONIBILIDAD A LLENO");
        console.log(error);
      })

    }
  }


}
