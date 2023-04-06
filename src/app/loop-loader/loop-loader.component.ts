import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loop-loader',
  templateUrl: './loop-loader.component.html',
  styleUrls: ['./loop-loader.component.less']
})
export class LoopLoaderComponent {

  constructor() {};

  @Input() stepText: string = '';
  @Input() show: boolean = false;
}
