import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioCrearOrdenService {
  constructor(private http: HttpClient, private router: Router) { }

  crearOrden(orden,user,id) {
    let misheaders = new HttpHeaders({});
    misheaders = misheaders.set('usuario', user);
    misheaders = misheaders.set('idusuario', id);
    let options = { headers: misheaders };
    let apiUrl = 'http://3.140.186.177:3004/ordenes/sinRegistro';
    return this.http.post<any>(apiUrl, orden,options)
      .pipe(map(data => {
        return data;
      }));
  }

}
