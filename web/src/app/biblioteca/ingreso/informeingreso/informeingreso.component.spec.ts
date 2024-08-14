import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeingresoComponent } from './informeingreso.component';

describe('InformeingresoComponent', () => {
  let component: InformeingresoComponent;
  let fixture: ComponentFixture<InformeingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeingresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformeingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
