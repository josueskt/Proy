import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAutorComponent } from './crear-autores.component';

describe('CrearAutoresComponent', () => {
  let component: CrearAutorComponent;
  let fixture: ComponentFixture<CrearAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearAutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
