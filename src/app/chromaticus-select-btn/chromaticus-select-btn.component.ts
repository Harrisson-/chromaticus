import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chromaticus-select-btn',
  templateUrl: './chromaticus-select-btn.component.html',
  styleUrls: ['./chromaticus-select-btn.component.less']
})
export class ChromaticusSelectBtnComponent {
  id: string = '';

  @Input() options: Array<string> = [];
  @Input() title: string = '';
  @Input() label: string = '';

  constructor() {
    this.id = 'select-' + Math.floor(Math.random() * 10 + 0);
  }

  ngOninit() {
    console.log("options", this.options)
  }
}
