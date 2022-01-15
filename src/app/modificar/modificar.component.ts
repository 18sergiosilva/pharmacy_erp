import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ModificarUsuarioService } from '../services/modificar-usuario.service';
import { first } from 'rxjs/operators';
import { ServicioCatalogoProductoService } from "../services/servicio-catalogo-producto.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {

  url = "assets/default.png";
  productos = [];
  nombre:string;
  precio:number;
  descripcion:string;
  cardImageBase64:string;
  sku = "";

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute,private toastr: ToastrService, private servicioCatalogoProducto: ServicioCatalogoProductoService) {}



  ngOnInit() {
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    this.getProductos(userLog,idLog);
  }

  getProductos(user,id) {
    this.servicioCatalogoProducto
      .obtenerProducto(user,id)
      .pipe(first())
      .subscribe(
        (data) => {
          this.productos = data
        },
        (error) => {
          console.log(error);
        }
      );
  }

  habilitarBotonActualizar() {
    var element = <HTMLInputElement>document.getElementById("btnActualizar");
    element.disabled = false;
  }

  deshabilitarBotonEliminar() {
    var element = <HTMLInputElement>document.getElementById("btnActualizar");
    element.disabled = true;
  }

  modificarProducto(id){
    let misheaders = new HttpHeaders({});
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    misheaders = misheaders.set('usuario', userLog);
    misheaders = misheaders.set('idusuario', idLog);
    let options = { headers: misheaders };
    if(this.cardImageBase64 != null){
      console.log("jesjes");
      let resp = this.http.put("http://3.140.186.177:3003/producto/"+id,
      {
        "imagen": this.cardImageBase64,
        "sku": this.sku,
        "nombre": this.nombre,
        "precio":this.precio,
        "descripcion":this.descripcion
      },options).toPromise().then((data: any) => {
        this.toastr.success('¡ALERTA!', data.mensaje);
        console.log(data);
        this.cancelar();
      }).catch((error: any) =>{
        this.toastr.success('¡ALERTA!', "NO SE HA PODIDO AGREGAR EL PRODUCTO");
        console.log(error);
        this.cancelar();
      })
    } else {
      let resp = this.http.put("http://3.140.186.177:3003/producto/"+id,
      {
        "sku": this.sku,
        "nombre": this.nombre,
        "precio":this.precio,
        "descripcion":this.descripcion
      },options).toPromise().then((data: any) => {
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
          //console.log(this.cardImageBase64);
          //this.nombre = this.cardImageBase64;
          this.url = event.target.result;
          // this.previewImagePath = imgBase64Path;
        }
      };
    };
  }

  cancelar() {
    this.cardImageBase64 = "";
    this.nombre = "";
    this.precio = 0;
    this.descripcion = "";
  }

}
