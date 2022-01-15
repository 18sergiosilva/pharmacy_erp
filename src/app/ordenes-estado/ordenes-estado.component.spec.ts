import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesEstadoComponent } from './ordenes-estado.component';

describe('OrdenesEstadoComponent', () => {
  let component: OrdenesEstadoComponent;
  let fixture: ComponentFixture<OrdenesEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
