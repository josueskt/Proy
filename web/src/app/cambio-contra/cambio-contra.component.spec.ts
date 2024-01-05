import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioContraComponent } from './cambio-contra.component';

describe('CambioContraComponent', () => {
  let component: CambioContraComponent;
  let fixture: ComponentFixture<CambioContraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambioContraComponent]
    });
    fixture = TestBed.createComponent(CambioContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
