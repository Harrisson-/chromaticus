import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopLoaderComponent } from './loop-loader.component';

describe('LoopLoaderComponent', () => {
  let component: LoopLoaderComponent;
  let fixture: ComponentFixture<LoopLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoopLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoopLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
