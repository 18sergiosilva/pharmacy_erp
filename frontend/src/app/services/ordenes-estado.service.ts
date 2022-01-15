import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdenesEstadoService {

  constructor(private http: HttpClient, private router: Router) { }

  obtenerOrdenes(user,id) {
    let misheaders = new HttpHeaders({});
    misheaders = misheaders.set('usuario', user);
    misheaders = misheaders.set('idusuario', id);
    let options = { headers: misheaders };
    let apiUrl = 'http://3.140.186.177:3004/ordenes';
    return this.http.get<any>(apiUrl, options)
      .pipe(map(data => {
        return data;
      }));
  }

  putOrdenes(id,estado,user,id2) {
    let misheaders = new HttpHeaders({});
    misheaders = misheaders.set('usuario', user);
    misheaders = misheaders.set('idusuario', id2);
    let options = { headers: misheaders };
    let apiUrl = 'http://3.140.186.177:3004/ordenes/'+id;
    return this.http.put<any>(apiUrl, 
      {"estado":estado},options
      )
      .pipe(map(data => {
        return data;
      }));
  }
}
