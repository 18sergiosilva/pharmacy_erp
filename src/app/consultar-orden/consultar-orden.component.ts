import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultar-orden',
  templateUrl: './consultar-orden.component.html',
  styleUrls: ['./consultar-orden.component.scss']
})
export class ConsultarOrdenComponent implements OnInit {

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
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { 
  }

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
      let resp = this.http.get("http://3.140.186.177:3004/ordenes/sinRegistro/"+this.orden,options).toPromise().then((data: any) => {
        //console.log(data);
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
          this.show6 = true;
        } else if(data.estado == 5){
          this.show5 = true;
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
  }




}
