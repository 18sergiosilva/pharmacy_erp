import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';

import { HomeComponent } from './home/home.component';
import { ModificarComponent } from './modificar/modificar.component';
import { VistaGiftcardsComponent } from './vista-giftcards/vista-giftcards.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { LoginComponent } from './login/login.component';
import { RegalarGiftcardsComponent } from './regalar-giftcards/regalar-giftcards.component';
import { InventarioGiftcardsComponent } from './inventario-giftcards/inventario-giftcards.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';
import { DetallesCompraComponent } from './detalles-compra/detalles-compra.component';
import { AdminComponent } from './admin/admin.component';
import { PagarComponent } from './pagar/pagar.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EliminarProductoComponent } from './eliminar-producto/eliminar-producto.component';
import { CatalogoProductosComponent } from './catalogo-productos/catalogo-productos.component';
import { ConsultarOrdenComponent } from './consultar-orden/consultar-orden.component';
import { CrearOrdenComponent } from './crear-orden/crear-orden.component';
import { EliminarOrdenComponent } from './eliminar-orden/eliminar-orden.component';
import { OrdenesEstadoComponent } from './ordenes-estado/ordenes-estado.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'modificar', component: ModificarComponent },
  { path: 'giftcards', component: VistaGiftcardsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'login', component: LoginComponent},
  { path: 'regalar', component: RegalarGiftcardsComponent },
  { path: 'inventario', component: InventarioGiftcardsComponent },
  { path: 'carrito', component: CarritoComponent},
  { path: 'compras',component:HistorialComprasComponent},
  { path: 'detallescompra/:id/:no',component:DetallesCompraComponent},
  { path: 'admin',component:AdminComponent},
  { path: 'pago/:total', component: PagarComponent},
  { path: 'crear', component: CrearProductoComponent },
  { path: 'eliminar', component: EliminarProductoComponent },
  { path: 'catalogo', component: CatalogoProductosComponent },
  { path: 'consultar', component: ConsultarOrdenComponent },
  { path: 'crear-orden',component: CrearOrdenComponent},
  { path: 'eliminarorden', component: EliminarOrdenComponent},
  { path: 'ordenes-estado', component: OrdenesEstadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
