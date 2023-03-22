import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chromaticus-btn',
  templateUrl: './chromaticus-btn.component.html',
  styleUrls: ['./chromaticus-btn.component.less']
})
export class ChromaticusBtnComponent {
  @Input() title: string = '';

}
