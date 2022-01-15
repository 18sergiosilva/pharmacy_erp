import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ModificarComponent } from './modificar/modificar.component';
import { VistaGiftcardsComponent } from './vista-giftcards/vista-giftcards.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { OrdenesEstadoComponent } from './ordenes-estado/ordenes-estado.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    HomeComponent,
    RegistrarseComponent,
    ModificarComponent,
    VistaGiftcardsComponent,
    RegalarGiftcardsComponent,
    InventarioGiftcardsComponent,
    VistaGiftcardsComponent,
    CarritoComponent,
    HistorialComprasComponent,
    DetallesCompraComponent,
    AdminComponent,
    CarritoComponent,
    PagarComponent,
    CrearProductoComponent,
    EliminarProductoComponent,
    CatalogoProductosComponent,
    ConsultarOrdenComponent,
    CrearOrdenComponent,
    EliminarOrdenComponent,
    OrdenesEstadoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
