import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chromaticus-canvas',
  templateUrl: './chromaticus-canvas.component.html',
  styleUrls: ['./chromaticus-canvas.component.less'],
})
export class ChromaticusCanvasComponent {
  private CANVAS_SIZE = 500;

  @Output() imgContextData = new EventEmitter<Uint8ClampedArray>;
  constructor() {};
  
  ngOnInit() {
    const canvas = document.getElementById('chromaticus-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    let img = new Image();
    const size = this.CANVAS_SIZE;
    img.onload = () => {
      if (context) {
        const ratio = img.width / img.height;
        canvas.width = size;
        canvas.height = size / ratio;
    
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        // trigger an event
        this.imgContextData.emit(context.getImageData(0, 0, canvas.width, canvas.height).data);
      }
    }
    img.src = "./assets/innoncentXBacon.jpg"; //vaporeon.png"; 
  }
  
}
