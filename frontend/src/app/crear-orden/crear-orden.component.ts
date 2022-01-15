import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as crypto from 'crypto-js';
import { first } from "rxjs/operators";
import { ServicioCrearOrdenService } from "../services/servicio-crear-orden.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.scss']
})
export class CrearOrdenComponent implements OnInit {

  constructor(private router: Router, private servicioCrearOrden: ServicioCrearOrdenService,private toastr: ToastrService) { }

  activar = 0;
  productos = [];
  datos: any;
  total: number;
  nombre = "";
  nit = "";
  nitEn = "";
  telefono = "";
  telefonoEn = "";
  direccion = "";
  direccionEn = "";
  encPass = "ayd1";
  listaCompraProducto = [];

  ngOnInit() {
    this.datos = localStorage.getItem('producto');
    if (this.datos != null && this.datos != "") {
      this.productos = JSON.parse(this.datos);
      this.getTotal();
    }

  }

  getTotal() {
    this.total = 0;
    for (let i = 0; i < this.productos.length; i++) {
      this.total += this.productos[i].precio * this.productos[i].cantidad;
    }
  }

  domicilio() {
    this.activar = 1;
  }

  tienda() {
    this.activar = 2;
  }

  camposObligatorios(): boolean {
    if (this.activar == 2) { //tienda
      if (this.nombre != "" && this.telefono != "") {
        this.encriptarTelefono();
        return true;
      }
      this.mensajeLlenarCampos();
      return false;
    }
    else if (this.activar == 1) //domicilio
    {
      if (this.nombre != "" && this.telefono != "" && this.direccion != "") {
        this.encriptarDireccion();
        this.encriptarTelefono();
        return true;
      }
      this.mensajeLlenarCampos();
      return false;
    }
    this.mensajeErrorSeleccion();
    return false;
  }

  pedido() {
    var bandera = 0;
    if (this.camposObligatorios() == true) {
      this.llenarArreglo();

      if (this.nit != "") {
        this.encriptarNit();
        bandera = 1;
      }

      if (this.activar == 1 && bandera == 1) {
        const orden =
        {
          "nombre": this.nombre,
          "direccion": this.direccionEn,
          "nit": this.nitEn,
          "detalle": this.listaCompraProducto,
          "telefono": this.telefonoEn
        };
        console.log(orden);
        this.postOrden(orden);
      }
      else if (this.activar == 1 && bandera == 0) {
        const orden =
        {
          "nombre": this.nombre,
          "direccion": this.direccionEn,
          "detalle": this.listaCompraProducto,
          "telefono": this.telefonoEn
        };
        console.log(orden);
        this.postOrden(orden);
      }
      else if (this.activar == 2 && bandera == 1) {
        const orden =
        {
          "nombre": this.nombre,
          "nit": this.nitEn,
          "detalle": this.listaCompraProducto,
          "telefono": this.telefonoEn
        };
        console.log(orden);
        this.postOrden(orden);
      }
      else if (this.activar == 2 && bandera == 0) {
        const orden =
        {
          "nombre": this.nombre,
          "detalle": this.listaCompraProducto,
          "telefono": this.telefonoEn
        };
        console.log(orden);
        this.postOrden(orden);
      }
    }
    this.limpiar();
    localStorage.setItem("producto","");
  }

  postOrden(orden) {
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    this.servicioCrearOrden
      .crearOrden(orden,userLog,idLog)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.codigoEstado == 200) {
            Swal.fire({
              text: 'Su orden fue procesada exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then(resultado => {
              if (resultado.value) {
                this.limpiar();
                this.toastr.success('Numero de Orden', data.codigoOrden);
                //this.router.navigate(["consultar"]);
              }
            });
          }
          else {
            Swal.fire({
              text: 'Ocurrio un error con su orden, Ingrese los datos nuevamente',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            }).then(resultado => {
              if (resultado.value) {
                this.limpiar();
              }
            });
          }
        },
        (error) => {
          Swal.fire({
            text: 'Ocurrio un error con su orden, Ingrese los datos nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          }).then(resultado => {
            if (resultado.value) {
              this.limpiar();
            }
          });
        }
      );
  }

  llenarArreglo() {
    if (this.listaCompraProducto.length == 0) {
      for (let i = 0; i < this.productos.length; i++) {
        const compraProducto =
        {
          "codigo": this.productos[i].sku,
          "cantidad": this.productos[i].cantidad
        }
        this.listaCompraProducto.push(compraProducto);
      }
    }
  }

  cancelar() {
    this.router.navigate(["carrito"]);
  }

  limpiar() {
    this.nombre = "";
    this.direccion = "";
    this.telefono = "";
    this.nit = "";
  }

  mensajeLlenarCampos() {
    Swal.fire({
      text: 'Debe llenar los campos obligatorios',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    })
  }

  mensajeErrorSeleccion() {
    Swal.fire({
      text: 'Debe seleccionar si recoge en tienda o desea entrega a domicilio',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    })
  }

  encriptarTelefono() {
    this.telefonoEn = this.telefono.toString();
    this.telefonoEn = crypto.AES.encrypt(this.telefonoEn.trim(), this.encPass.trim()).toString();
  }

  encriptarDireccion() {
    this.direccionEn = this.direccion;
    this.direccionEn = crypto.AES.encrypt(this.direccionEn.trim(), this.encPass.trim()).toString();
    //crypto.AES.decrypt(this.direccionEn.trim(), this.encPass.trim()).toString(crypto.enc.Utf8);


  }

  encriptarNit() {
    this.nitEn = this.nit.toString();
    this.nitEn = crypto.AES.encrypt(this.nitEn.trim(), this.encPass.trim()).toString();
  }
}


