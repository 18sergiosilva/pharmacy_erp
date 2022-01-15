import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient,private toastr: ToastrService) { }
  url = "assets/default.png";
  sku:number;
  nombre:string;
  precio:number;
  descripcion:string;
  cardImageBase64:string;

  ngOnInit() {
  }

  

  onClick(){
    let misheaders = new HttpHeaders({});
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    misheaders = misheaders.set('usuario', userLog);
    misheaders = misheaders.set('idusuario', idLog);
    let options = { headers: misheaders };
    if(this.cardImageBase64 != null){
      let resp = this.http.post("http://3.140.186.177:3000/productos",
      {
        "imagen": this.cardImageBase64,
        "sku": this.sku,
        "nombre": this.nombre,
        "precio":this.precio,
        "descripcion":this.descripcion
      }, options).toPromise().then((data: any) => {
        this.toastr.success('¡ALERTA!', data.mensaje);
        console.log(data);
        this.cancelar();
      }).catch((error: any) =>{
        this.toastr.success('¡ALERTA!', "NO SE HA PODIDO AGREGAR EL PRODUCTO");
        console.log(error);
        this.cancelar();
      })
    }
  }

  cancelar() {
    this.cardImageBase64 = "";
    this.sku = 0;
    this.nombre = "";
    this.precio = 0;
    this.descripcion = "";
  }

  onFileSelected(event: { target: { files: Blob[]; }; }) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = rs => {
          const imgBase64Path = event.target.result;
          if (imgBase64Path[11] == 'j') {
            this.cardImageBase64 ="data:image/jpeg;base64,"+ imgBase64Path.substring(23);
          } else {
            this.cardImageBase64 = "data:image/jpeg;base64,"+imgBase64Path.substring(22);
          }
          console.log(this.cardImageBase64);
          //this.nombre = this.cardImageBase64;
          this.url = event.target.result;
          // this.previewImagePath = imgBase64Path;
        }
      };
    };
  }

}
