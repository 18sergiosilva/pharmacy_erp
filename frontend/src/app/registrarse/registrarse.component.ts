import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as crypto from 'crypto-js';
import { RegistroService } from "../services/registro.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  constructor(private router: Router, private servicioRegistrar: RegistroService) { }

  ngOnInit() {
  }

  username = "";
  correo = "";
  contrasena = "";
  contrasena2 = "";
  nombres = "";
  apellidos = "";
  telefono = "";
  direccion = "";
  telefonoEn = "";
  direccionEn = "";
  contrasenaEn = "";
  usuario = 2;
  encPass = "ayd1";

  agregar() {
    if (this.camposLLenos() == true) {
      if (this.verificarContraseña() == true) {
        const cliente = {
          "username": this.username,
          "nombres": this.nombres,
          "apellidos": this.apellidos,
          "correo": this.correo,
          "telefono": this.telefonoEn,
          "direccion": this.direccionEn,
          "contraseña": this.contrasenaEn,
          "tipoUsuario": this.usuario
        }
        this.servicioRegistrar
          .registrarCliente(cliente)
          .pipe(first())
          .subscribe(
            (data) => {
              console.log(data);
              if (data.codigoEstado == 200) {
                Swal.fire({
                  text: 'Su registro fué exitoso',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                }).then(resultado => {
                  if (resultado.value) {
                    this.cancelar();
                    this.router.navigate(['login']);
                  }
                });
              }
            },
            (error) => {
              if (error.status == 409) {
                Swal.fire({
                  text: 'Error! El username ya existe',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                }).then(resultado => {
                  if (resultado.value) {
                    this.username = "";
                  }
                });

              }
              else if (error.status == 404) {
                Swal.fire({
                  text: 'Error!',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                }).then(resultado => {
                  if (resultado.value) {
                    this.cancelar();
                  }
                });
              }
            }
          );
      }
    }
    else {
      Swal.fire({
        text: 'Error! Debe llenar todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      })
    }
  }

  camposLLenos(): boolean {
    if (this.username != "" && this.nombres != "" && this.apellidos != "" && this.contrasena != "" && this.contrasena2 != "" && this.correo != "" && this.telefono != "" && this.direccion != "" && this.usuario != 2) {
      return true
    }
    return false
  }

  verificarContraseña(): boolean {
    if (this.contrasena != this.contrasena2) {
      Swal.fire({
        text: 'Error contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      }).then(resultado => {
        if (resultado.value) {
          this.contrasena = "";
          this.contrasena2 = "";
        }
      });
      return false;
    }
    else {
      this.encriptarDireccion();
      this.encriptarTelefono();
      this.encriptarContrasena();
      return true;
    }
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

  encriptarContrasena() {
    this.contrasenaEn = this.contrasena;
    this.contrasenaEn = crypto.AES.encrypt(this.contrasenaEn.trim(), this.encPass.trim()).toString();
    //crypto.AES.decrypt(this.direccionEn.trim(), this.encPass.trim()).toString(crypto.enc.Utf8);
  }


  cancelar() {
    this.username = "";
    this.correo = "";
    this.contrasena = "";
    this.nombres = "";
    this.apellidos = "";
    this.telefono = "";
    this.direccion = "";
    this.contrasena2 = "";
  }

}
