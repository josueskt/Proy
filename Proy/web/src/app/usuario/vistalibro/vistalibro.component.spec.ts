import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistalibroComponent } from './vistalibro.component';

describe('VistalibroComponent', () => {
  let component: VistalibroComponent;
  let fixture: ComponentFixture<VistalibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistalibroComponent]
    });
    fixture = TestBed.createComponent(VistalibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
