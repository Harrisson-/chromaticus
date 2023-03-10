import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasAnalyserComponent } from './canvas-analyser.component';

describe('CanvasAnalyserComponent', () => {
  let component: CanvasAnalyserComponent;
  let fixture: ComponentFixture<CanvasAnalyserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasAnalyserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasAnalyserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
