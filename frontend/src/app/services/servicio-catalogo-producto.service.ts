import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioCatalogoProductoService {

  constructor(private http: HttpClient, private router: Router) { }

  obtenerProducto(user,id) {
    let misheaders = new HttpHeaders({});
    misheaders = misheaders.set('usuario', user);
    misheaders = misheaders.set('idusuario', id);
    let options = { headers: misheaders };
    let apiUrl = 'http://3.140.186.177:3002/producto';
    return this.http.get<any>(apiUrl, options)
      .pipe(map(data => {
        return data;
      }));
  }

  buscarProducto(producto,user,id) {
    let misheaders = new HttpHeaders({});
    misheaders = misheaders.set('usuario', user);
    misheaders = misheaders.set('idusuario', id);
    let options = { headers: misheaders };
    let apiUrl = 'http://3.140.186.177:3002/producto?search='+ producto;
    return this.http.get<any>(apiUrl, options)
      .pipe(map(data => {
        return data;
      }));
  }

  ordenarProducto(orden,user,id) {
    let misheaders = new HttpHeaders({});
    misheaders = misheaders.set('usuario', user);
    misheaders = misheaders.set('idusuario', id);
    let options = { headers: misheaders };
    let apiUrl = 'http://3.140.186.177:3002/producto?sp='+ orden;
    return this.http.get<any>(apiUrl, options)
      .pipe(map(data => {
        return data;
      }));
  }

  filtrarProducto(minimo,maximo,user,id) {
    let misheaders = new HttpHeaders({});
    misheaders = misheaders.set('usuario', user);
    misheaders = misheaders.set('idusuario', id);
    let options = { headers: misheaders };
    let apiUrl = 'http://3.140.186.177:3002/producto?pmin='+ minimo+"&pmax="+maximo;
    return this.http.get<any>(apiUrl, options)
      .pipe(map(data => {
        return data;
      }));
  }

  eliminarProducto(id,user,id2) {
    let misheaders = new HttpHeaders({});
    misheaders = misheaders.set('usuario', user);
    misheaders = misheaders.set('idusuario', id2);
    let options = { headers: misheaders };
    let apiUrl = 'http://3.140.186.177:3001/producto/'+id;
    return this.http.delete<any>(apiUrl,options)
      .pipe(map(data => {
        return data;
      }));
  }
}

