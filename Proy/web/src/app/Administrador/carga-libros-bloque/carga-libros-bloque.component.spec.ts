import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaLibrosBloqueComponent } from './carga-libros-bloque.component';

describe('CargaLibrosBloqueComponent', () => {
  let component: CargaLibrosBloqueComponent;
  let fixture: ComponentFixture<CargaLibrosBloqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargaLibrosBloqueComponent]
    });
    fixture = TestBed.createComponent(CargaLibrosBloqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
