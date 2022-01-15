import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Utils } from '../utils/utils';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  correo: string;
  contra: string;
  incorrecto = false;
  contrasenaEn = "";
  encPass = "ayd1";

  ngOnInit() {
    if (localStorage.getItem('logued') === '1') {
      localStorage.setItem('logued', '0');
      
    }
    Utils.indices = [
      {
        title: 'Ingresar',
        url: '/login',
        icon: 'mdi-settings-box'
      },
      {
        title: 'Registrarse',
        url: '/registrarse',
        icon: 'mdi-account-multiple-plus'
      },
      {
        title: 'Catalogo Productos',
        url: '/catalogo',
        icon: 'mdi-food'
      },
      {
        title: 'Carrito de Compra',
        url: '/carrito',
        icon: 'mdi-shopping'
      }
    ];
  }
  entrar() {
    this.encriptarContrasena(this.contra);
    
  }

  cancelar() {
    this.correo = '';
    this.contra = '';
    this.incorrecto = false;
  }


  encriptarContrasena(contra:string): boolean {
    this.contrasenaEn = contra;
    this.contrasenaEn = crypto.AES.encrypt(this.contrasenaEn.trim(), this.encPass.trim()).toString();
    return true;
  }


}
