import { Component } from '@angular/core';

@Component({
  selector: 'app-canvas-analyser',
  templateUrl: './canvas-analyser.component.html',
  styleUrls: ['./canvas-analyser.component.less']
})
export class CanvasAnalyserComponent {
  CANVAS_SIZE = 500;

  constructor() {

  };

  ngOnInit() {
    const canvas = document.getElementById('viewport') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    let img = new Image();
    const size = this.CANVAS_SIZE;
    img.onload = function() {
      if (context) {
        const ratio = img.width / img.height;
        canvas.width = size;
        canvas.height = size / ratio;
    
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const datas = context.getImageData(0, 0, canvas.width, canvas.height);
        fromImageDataToRGBArray(datas.data);
        // console.log("new list", newList);
        
      }
    }
    img.src = "./assets/vaporeon.png";
  }
}

function majorColors(hslArray: Array<(number)[]>): Set<string> {
  const colorSet: Set<string> = new Set();

  for (const color of hslArray) {
    colorSet.add(`${color[0]}, 50%, 50%`); //${color[1]}%, ${color[2]}%`);
  }
  return colorSet;
}


function majorRGB(rgbArray: Array<string>) {
  const colorSet: Set<string> = new Set();

  for (const color of rgbArray) {
    colorSet.add(color);
  }
  return colorSet;
}

function fromImageDataToRGBArray(clampedArray: Uint8ClampedArray) {
  var rgbArray: Array<string> = [];
  var hslArray: Array<(number)[]> = [];
  for (let i = 0; i <= clampedArray.length; i = i + 4) {
    rgbArray.push(`rgb(${clampedArray[i]}, ${clampedArray[i + 1]}, ${clampedArray[ i + 2]})`);
    hslArray.push(rgbToHsl(clampedArray[i], clampedArray[i + 1], clampedArray[ i + 2]))
  }

  // const palettergbDom = document.getElementById('palettergb') as HTMLElement;
  // const palettergb = majorRGB(rgbArray);
  // palettergb.forEach(color => {
  //   const newDiv = document.createElement("span");
  //   newDiv.style.width = 20 + "px";
  //   newDiv.style.height = 20 + "px";
  //   newDiv.style.background = color;
  //   palettergbDom.appendChild(newDiv);
  // });


  const paletteDom = document.getElementById('palette') as HTMLElement;
  let palette = majorColors(hslArray);
  const sortedArray = [...palette].sort((a, b) => +a.split(',')[0] - +b.split(',')[0]);
  palette = new Set(sortedArray);
  palette.forEach(color => {
    const newDiv = document.createElement("span");
    newDiv.style.width = 20 + "px";
    newDiv.style.height = 20 + "px";
    newDiv.style.background = `hsl(${color})`;
    paletteDom.appendChild(newDiv);
  });
  console.log('hslArray Set', palette);
  return rgbArray;
}

function roundToZero(value: number) {
  return Math.round((value + Number.EPSILON) * 1) / 1
}

// TMP START
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function rgbToHsl(r: number, g: number, b: number){
  r /= 255, g /= 255, b /= 255;
  let h = 0;
  let l = 0;
  let s = 0;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  h = s = l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  }else{
      var d = (max - min);
      s = l >= 0.5 ? d / (2 - (max + min)) : d / (max + min);
      switch(max){
          case r: h = ((g - b) / d + 0)*60; break;
          case g: h = ((b - r) / d + 2)*60; break;
          case b: h = ((r - g) / d + 4)*60; break;
      }
  }
  return [roundToZero(h), roundToZero(s * 100), roundToZero(l * 100)];
}
// TMP END

