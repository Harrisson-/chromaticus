import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-color-blocks',
  templateUrl: './color-blocks.component.html',
  styleUrls: ['./color-blocks.component.less']
})
export class ColorBlocksComponent {
  @Input() colors: string[] = [];

  constructor() {}
}
