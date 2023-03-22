import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-btn',
  templateUrl: './custom-btn.component.html',
  styleUrls: ['./custom-btn.component.less']
})
export class CustomBtnComponent {
  @Input() title: string = '';

}
