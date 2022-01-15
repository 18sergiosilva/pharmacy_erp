import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarOrdenComponent } from './eliminar-orden.component';

describe('EliminarOrdenComponent', () => {
  let component: EliminarOrdenComponent;
  let fixture: ComponentFixture<EliminarOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
