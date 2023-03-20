import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBlockComponent } from './color-block.component';

describe('ColorBlockComponent', () => {
  let component: ColorBlockComponent;
  let fixture: ComponentFixture<ColorBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
