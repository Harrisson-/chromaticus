import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromaticusSelectBtnComponent } from './chromaticus-select-btn.component';

describe('ChromaticusSelectBtnComponent', () => {
  let component: ChromaticusSelectBtnComponent;
  let fixture: ComponentFixture<ChromaticusSelectBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChromaticusSelectBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChromaticusSelectBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
