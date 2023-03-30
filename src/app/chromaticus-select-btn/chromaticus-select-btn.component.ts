import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() selection = new EventEmitter<number>();

  constructor() {
    this.id = 'select-' + Math.floor(Math.random() * 10 + 0);
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value as string;
    this.selection.emit(+value);
  }
}
