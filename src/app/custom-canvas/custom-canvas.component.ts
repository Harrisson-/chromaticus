import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-canvas',
  templateUrl: './custom-canvas.component.html',
  styleUrls: ['./custom-canvas.component.less']
})
export class CustomCanvasComponent {
  private CANVAS_SIZE = 500;

  ngOnInit() {
    const canvas = document.getElementById('custom-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    let img = new Image();
    const size = this.CANVAS_SIZE;
    img.onload = () => {
      if (context) {
        const ratio = img.width / img.height;
        canvas.width = size;
        canvas.height = size / ratio;
    
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      img.src = "./assets/vaporeon.png";
    }
  }
}
