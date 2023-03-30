import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chromaticus-range-btn',
  templateUrl: './chromaticus-range-btn.component.html',
  styleUrls: ['./chromaticus-range-btn.component.less']
})
export class ChromaticusRangeBtnComponent {
  selectedValue: number = 0;
  steps: number = 0;

  @Input() max: string = '40';
  @Input() label: string = '';

  @Output() actualRange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    this.steps = Math.round(+this.max / 5);  
  }

  setRam(event: Event){
    const target = event.target as HTMLInputElement;
    this.selectedValue = +target.value;
    this.actualRange.emit(this.selectedValue);
  }
}
