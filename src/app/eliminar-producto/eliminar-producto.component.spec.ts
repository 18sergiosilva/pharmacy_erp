import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProductoComponent } from './eliminar-producto.component';

describe('EliminarProductoComponent', () => {
  let component: EliminarProductoComponent;
  let fixture: ComponentFixture<EliminarProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
