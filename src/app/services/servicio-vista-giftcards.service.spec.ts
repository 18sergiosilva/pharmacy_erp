import { ServicioVistaGiftcardsService } from './servicio-vista-giftcards.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpErrorResponse} from '@angular/common/http';
import { ACTUALIZACION, PROPIABASE } from '../mockData'

describe('ServicioVistaGiftcardsService', () => {

  let router: Router;
  let coursesService: ServicioVistaGiftcardsService;
  let httpTestingController: HttpTestingController;
  
  const routes: Routes = [
    { path: 'cards', component: ServicioVistaGiftcardsService },
    { path: 'cards/mongo', component: ServicioVistaGiftcardsService }
  ];

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterTestingModule.withRoutes(routes),  HttpClientTestingModule],
    providers: [ServicioVistaGiftcardsService]
  })

  coursesService = TestBed.get(ServicioVistaGiftcardsService),
  httpTestingController = TestBed.get(HttpTestingController);

});

});
