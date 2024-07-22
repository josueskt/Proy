import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitorialPrestamosComponent } from './hitorial-prestamos.component';

describe('HitorialPrestamosComponent', () => {
  let component: HitorialPrestamosComponent;
  let fixture: ComponentFixture<HitorialPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HitorialPrestamosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HitorialPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
