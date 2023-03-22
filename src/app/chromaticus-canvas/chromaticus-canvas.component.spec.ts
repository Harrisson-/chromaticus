import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromaticusCanvasComponent } from './chromaticus-canvas.component';

describe('ChromaticusCanvasComponent', () => {
  let component: ChromaticusCanvasComponent;
  let fixture: ComponentFixture<ChromaticusCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChromaticusCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChromaticusCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
