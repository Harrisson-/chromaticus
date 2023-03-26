import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromaticusRangeBtnComponent } from './chromaticus-range-btn.component';

describe('ChromaticusRangeBtnComponent', () => {
  let component: ChromaticusRangeBtnComponent;
  let fixture: ComponentFixture<ChromaticusRangeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChromaticusRangeBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChromaticusRangeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
