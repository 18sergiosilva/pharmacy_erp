import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-eliminar-orden',
  templateUrl: './eliminar-orden.component.html',
  styleUrls: ['./eliminar-orden.component.scss']
})
export class EliminarOrdenComponent implements OnInit {

  show:boolean=false;
  show2:boolean=false;
  show3:boolean=false;
  show4:boolean=false;
  show5:boolean=false;
  show6:boolean=false;
  show7:boolean=false;
  orden:string;
  productos = [];
  productos2 = [];

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onClick(){
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    let misheaders = new HttpHeaders({});
    misheaders = misheaders.set('usuario', userLog);
    misheaders = misheaders.set('idusuario', idLog);
    let options = { headers: misheaders };
    if(this.orden != null){
      
      let resp = this.http.get("http://3.140.186.177:3004/ordenes/sinRegistro/"+this.orden, options
      ).toPromise().then((data: any) => {
        //console.log(data);
        this.habilitarBotonEliminar();
        this.show7 = true;
        this.productos = data;
        this.productos2 = data.detalle;
        //console.log(this.productos2);
        if(data.estado == 0){
          this.show = true;
        } else if(data.estado == 1){
          this.show2 = true;
        } else if(data.estado == 2){
          this.show3 = true;
        } else if(data.estado == 3){
          this.show4 = true;
        } else if(data.estado == 4){
          this.show5 = true;
        } else if(data.estado == 5){
          this.show6 = true;
        }
      }).catch((error: any) =>{
        this.toastr.success('¡ALERTA!', "NO SE HA PODIDO OBTENER LA ORDEN");
        console.log(error);
        this.cancelar();
      })
    }
  }


  cancelar() {
    this.orden = "";
    this.show = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
    this.show5 = false;
    this.show6 = false;
    this.show7 = false;
    this.deshabilitarBotonEliminar();
  }

  habilitarBotonEliminar() {
    var element = <HTMLInputElement>document.getElementById("btnEliminar");
    element.disabled = false;
  }

  deshabilitarBotonEliminar() {
    var element = <HTMLInputElement>document.getElementById("btnEliminar");
    element.disabled = true;
  }

  eliminarProducto() {
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    let misheaders = new HttpHeaders({});
    misheaders = misheaders.set('usuario', userLog);
    misheaders = misheaders.set('idusuario', idLog);
    let options = { headers: misheaders };
    Swal.fire({
      text: '¿Esta seguro de eliminar el producto?',
      icon: 'question',
      confirmButtonText: 'Aceptar',
      showCancelButton: true
    }).then(resultado => {
      if (resultado.value) {
      let resp = this.http.delete("http://3.140.186.177:3004/ordenes/"+this.orden,options
      ).toPromise().then((data: any) => {
        if (data.mensaje == "La orden se elimino con exito") {
          Swal.fire({
            text: 'Orden eliminada exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(resultado => {
            if (resultado.value) {
              this.router.navigate(['home']);
              //window.location.reload();
            }
          });

        }
      }).catch((error: any) =>{
        Swal.fire({
          text: 'Error al eliminar la orden seleccionada',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        }).then(resultado => {
          if (resultado.value) {
            this.orden = "";
            this.deshabilitarBotonEliminar();
          }
        });
        this.cancelar();
      })
      } else {
        this.orden = "";
        this.show = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.show6 = false;
        this.show7 = false;
        this.deshabilitarBotonEliminar();
      }
    });

  }

}
