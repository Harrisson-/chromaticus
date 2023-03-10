import { Component } from '@angular/core';

@Component({
  selector: 'app-canvas-analyser',
  templateUrl: './canvas-analyser.component.html',
  styleUrls: ['./canvas-analyser.component.less']
})
export class CanvasAnalyserComponent {

  constructor() {

  };

  ngOnInit() {
    const canvas = document.getElementById('viewport') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    let img = new Image();
    img.src = "./assets/vaporeon.png";
    img.onload = function() {
      if (context) {
        context.drawImage(img, 0, 0);
        const datas = context.getImageData(0, 0, 490, 490);
        const newList = fromImageDataToRGBArray(datas.data);
        console.log("new list", newList);
        
        function fromImageDataToRGBArray(clampedArray: Uint8ClampedArray) {
          var rgbArray: Array<string> = [];
          for (let i = 0; i <= clampedArray.length; i = i + 3) {
            rgbArray.push(`rgb(${clampedArray[i]}, ${clampedArray[i + 1]}, ${clampedArray[ i + 2]})`);
          }
          return rgbArray;
        }
      }
    }
  }
}
