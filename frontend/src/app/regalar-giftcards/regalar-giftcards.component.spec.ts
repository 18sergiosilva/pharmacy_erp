import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RegalarGiftcardsComponent } from './regalar-giftcards.component';
import { Giftcard2 } from "../models/modelos";
import { FormsModule } from '@angular/forms';

describe('RegalarGiftcardsComponent', () => {
  let component: RegalarGiftcardsComponent;
  let fixture: ComponentFixture<RegalarGiftcardsComponent>;
  let router: Router;
  localStorage.setItem('logued', '1');
  
  const routes: Routes = [
    { path: 'regalar', component: RegalarGiftcardsComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes), FormsModule],
      declarations: [ RegalarGiftcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegalarGiftcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  
});
