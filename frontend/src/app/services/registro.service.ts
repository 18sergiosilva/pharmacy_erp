import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient, private router: Router) { }

  registrarCliente(cliente) {
    let apiUrl = 'http://3.140.186.177:3005/users/register';
    return this.http.post<any>(apiUrl, cliente)
      .pipe(map(data => {
        return data;
      }));
  }
}
