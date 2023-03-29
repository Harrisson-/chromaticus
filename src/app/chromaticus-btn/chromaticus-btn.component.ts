import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chromaticus-btn',
  templateUrl: './chromaticus-btn.component.html',
  styleUrls: ['./chromaticus-btn.component.less']
})
export class ChromaticusBtnComponent {
  @Input() title: string = '';

  @Function() toto: Function = () => {};

  @Output() action = new EventEmitter<void>();

  constructor() {}

  eventTrigger(_event: Event) {
    this.action.emit();
  }

}
