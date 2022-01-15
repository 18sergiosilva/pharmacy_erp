import { ServicioRegalarService } from './servicio-regalar.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpErrorResponse} from '@angular/common/http';
import { DATOS, REGALO } from '../mockData'

describe('ServicioRegalarService', () => {

  let router: Router;
  let coursesService: ServicioRegalarService;
  let httpTestingController: HttpTestingController;
  
  const routes: Routes = [
    { path: 'usuario/:id', component: ServicioRegalarService }
  ];

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
    providers: [ServicioRegalarService]
  })

  coursesService = TestBed.get(ServicioRegalarService),
  httpTestingController = TestBed.get(HttpTestingController);

});

});
