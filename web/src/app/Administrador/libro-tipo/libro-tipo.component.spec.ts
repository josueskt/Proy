import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroTipoComponent } from './libro-tipo.component';

describe('LibroTipoComponent', () => {
  let component: LibroTipoComponent;
  let fixture: ComponentFixture<LibroTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroTipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibroTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
