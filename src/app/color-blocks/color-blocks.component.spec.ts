import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBlocksComponent } from './color-blocks.component';

describe('ColorBlocksComponent', () => {
  let component: ColorBlocksComponent;
  let fixture: ComponentFixture<ColorBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorBlocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
