import { Component, OnInit } from '@angular/core';
import { ServicioCatalogoProductoService } from "../services/servicio-catalogo-producto.service";
import { Router } from '@angular/router';
import { first } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-catalogo-productos',
  templateUrl: './catalogo-productos.component.html',
  styleUrls: ['./catalogo-productos.component.scss']
})
export class CatalogoProductosComponent implements OnInit {

  constructor(private router: Router, private servicioCatalogoProducto: ServicioCatalogoProductoService, private toastr: ToastrService) { }

  productos = [];
  minimo = "";
  maximo = "";
  orden = "";
  datos: any;
  listaCarrito = [];
  getProducto = "";

  ngOnInit() {
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    this.getProductos(userLog,idLog);
    this.getProducto = localStorage.getItem('producto');
    if (this.getProducto != null && this.getProducto != "") {
      this.listaCarrito = JSON.parse(this.getProducto);
    }
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

  buscarProducto(valor) {
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    this.servicioCatalogoProducto
      .buscarProducto(valor,userLog,idLog)
      .pipe(first())
      .subscribe(
        (data) => {
          this.orden = "0";
          this.productos = data
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ordenarProducto() {
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    this.servicioCatalogoProducto
      .ordenarProducto(this.orden,userLog,idLog)
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

  filtrarProductos() {
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    this.servicioCatalogoProducto
      .filtrarProducto(this.minimo, this.maximo,userLog,idLog)
      .pipe(first())
      .subscribe(
        (data) => {
          this.orden = "0";
          this.productos = data
        },
        (error) => {
          console.log(error);
        }
      );
  }

  agregarAlCarrito(sku) {
    var bandera = 0;
    for (let i = 0; i < this.listaCarrito.length; i++) {
      if (this.listaCarrito[i].sku == sku) {
        this.listaCarrito[i].cantidad += 1;
        localStorage.setItem('producto', JSON.stringify(this.listaCarrito));
        this.toastr.success('¡ALERTA!', "Se agrego "+ this.listaCarrito[i].nombre+" Al carrito de compra");
        bandera = 1;
        break;
      }
    }

    if (bandera != 1) {
      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].sku == sku) {
          const compraProducto =
          {
            createdAt: this.productos[i].createdAt,
            descripcion: this.productos[i].descripcion,
            imagen: this.productos[i].imagen,
            nombre: this.productos[i].nombre,
            precio: this.productos[i].precio,
            cantidad: 1,
            sku: this.productos[i].sku,
            updatedAt: this.productos[i].updatedAt,
            urlImagen: this.productos[i].urlImagen
          }

          this.listaCarrito.push(compraProducto);
          localStorage.setItem('producto', JSON.stringify(this.listaCarrito));
          //console.log(localStorage.getItem('producto'));
          break;
        }
      }
    }

  }


}
