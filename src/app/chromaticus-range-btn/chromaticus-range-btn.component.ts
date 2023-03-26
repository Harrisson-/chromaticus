import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chromaticus-range-btn',
  templateUrl: './chromaticus-range-btn.component.html',
  styleUrls: ['./chromaticus-range-btn.component.less']
})
export class ChromaticusRangeBtnComponent {
  selectedValue: number = 0;
  @Input() max: string = '40';
  @Input() label: string = '';

  constructor() {}

  setRam(value: string){
    this.selectedValue = +value;
    console.log(this.selectedValue);
  }

}
