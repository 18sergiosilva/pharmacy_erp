import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  constructor(private router: Router) { }

  productos = [];
  datos = "";
  total: number;

  ngOnInit() {
    this.datos = localStorage.getItem('producto');
    if (this.datos != null && this.datos != "") {
      this.productos = JSON.parse(this.datos);
      this.getTotal();
    }
  }


  setCantidad(sku, cantidad) {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].sku == sku) {
        this.productos[i].cantidad = cantidad;
        localStorage.setItem('producto', JSON.stringify(this.productos));
        this.getTotal();
        break;
      }
    }
  }

  eliminar(sku) {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].sku == sku) {
        this.productos = this.productos.filter((_, index) => index !== i);
        localStorage.setItem('producto', JSON.stringify(this.productos));
        this.datos = localStorage.getItem('producto')
        //console.log(this.datos);
        this.getTotal();
        break;
      }
    }
  }

  getTotal() {
    this.total = 0;
    for (let i = 0; i < this.productos.length; i++) {
      this.total += this.productos[i].precio * this.productos[i].cantidad;
    }
  }

  comprar() {
    if (this.datos.length != 2) {
      this.router.navigate(['crear-orden']);
    }
    else {
      Swal.fire({
        text: 'Debe agregar productos para poder comprar',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      }).then(resultado => {
        if (resultado.value) {
          this.router.navigate(['catalogo']);
        }
      });
    }
  }
}



