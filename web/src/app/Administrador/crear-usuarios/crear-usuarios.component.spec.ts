import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuariosComponent } from './crear-usuarios.component';

describe('CrearUsuariosComponent', () => {
  let component: CrearUsuariosComponent;
  let fixture: ComponentFixture<CrearUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearUsuariosComponent]
    });
    fixture = TestBed.createComponent(CrearUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
