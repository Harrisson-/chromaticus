import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromaticusBtnComponent } from './chromaticus-btn.component';

describe('ChromaticusBtnComponent', () => {
  let component: ChromaticusBtnComponent;
  let fixture: ComponentFixture<ChromaticusBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChromaticusBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChromaticusBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
