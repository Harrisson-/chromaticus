import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  imgDatas: Uint8ClampedArray = new Uint8ClampedArray();
  globalColors: Array<string> = [];

  constructor() {}
  
  getImageDatas(value: Uint8ClampedArray) {
    this.imgDatas = value;
  }

  getColors(value: Array<string>) {
    this.globalColors = value;
  }
}
