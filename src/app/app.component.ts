import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  imgDatas: Uint8ClampedArray = new Uint8ClampedArray();
  globalColors: Array<string> = [];
  fileToUpload: any;
  disablePanel: boolean = true;

  constructor() {}
  
  getImageDatas(value: Uint8ClampedArray) {
    this.imgDatas = value;
    this.disablePanel = !Boolean(value.length > 0);
  }

  getColors(value: Array<string>) {
    this.globalColors = value;
  }

  getImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.fileToUpload =  URL.createObjectURL(files[0]);
  }
}
