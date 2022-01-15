import { Component, OnInit } from '@angular/core';
import { ServicioCatalogoProductoService } from "../services/servicio-catalogo-producto.service";
import { Router } from '@angular/router';
import { first } from "rxjs/operators";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.scss']
})
export class EliminarProductoComponent implements OnInit {

  constructor(private router: Router, private servicioCatalogoProducto: ServicioCatalogoProductoService) { }

  productos = [];
  sku = "";

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

  habilitarBotonEliminar() {
    var element = <HTMLInputElement>document.getElementById("btnEliminar");
    element.disabled = false;
  }

  deshabilitarBotonEliminar() {
    var element = <HTMLInputElement>document.getElementById("btnEliminar");
    element.disabled = true;
  }

  eliminarProducto(id) {
    let userLog = localStorage.getItem("user");
    let idLog = localStorage.getItem("userid");
    Swal.fire({
      text: '¿Esta seguro de eliminar el producto?',
      icon: 'question',
      confirmButtonText: 'Aceptar',
      showCancelButton: true
    }).then(resultado => {
      if (resultado.value) {
        this.servicioCatalogoProducto
          .eliminarProducto(id,userLog,idLog)
          .pipe(first())
          .subscribe(
            (data) => {
              if (data.mensaje == "Producto eliminado exitosamente") {
                Swal.fire({
                  text: 'Producto eliminado exitosamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                }).then(resultado => {
                  if (resultado.value) {
                    this.router.navigate(['home']);
                    //window.location.reload();
                  }
                });

              }

            },
            (error) => {
              Swal.fire({
                text: 'Error al eliminar el producto seleccionado',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              }).then(resultado => {
                if (resultado.value) {
                  this.sku = "0";
                  this.deshabilitarBotonEliminar();
                }
              });
            }
          );


      } else {
        this.sku = "0";
        this.deshabilitarBotonEliminar();
      }
    });

  }

  cancelar() {
    this.router.navigate(['home']);
  }

}
