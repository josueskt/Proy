import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstanteComponent } from './editar-estante.component';

describe('EditarEstanteComponent', () => {
  let component: EditarEstanteComponent;
  let fixture: ComponentFixture<EditarEstanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEstanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarEstanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
