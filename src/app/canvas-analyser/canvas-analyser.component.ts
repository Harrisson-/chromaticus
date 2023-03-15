import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-canvas-analyser',
  templateUrl: './canvas-analyser.component.html',
  styleUrls: ['./canvas-analyser.component.less'],
  encapsulation: ViewEncapsulation.None
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
        const hslArray = fromImageDataToColorArray(datas.data, rgbToHsl2);//rgbToHsl);

        const paletteDom = document.getElementById('palette') as HTMLElement;
        
        let palette = majorColors(hslArray);
        palette = sortColorSetHue(palette);

        palette.forEach(color => {
          createNewSpanColor(paletteDom, color);
        });
        console.log('hslArray Set', palette);
        // console.log("new list", newList);
        
      }
    }
    img.src = "./assets/vaporeon.png";
  }
}

function initCentroids(dataset: Set<String>, k: number) {
  const colorArray = [...dataset];
  const centroidIndexes = [];
  let index;
  while (centroidIndexes.length < k) {
    index = colorArray[Math.floor(Math.random() * (colorArray.length - 0) + 0)];
    centroidIndexes.push(index);
  }
}

function fillCentroidsDataset(dataset: Set<string>, centroidsIndexes: Array<string>): Map<string, Array<string>> {
  var centroidMap = new Map();       
  for(var i = 0; i < centroidsIndexes.length; i++){ 
    centroidMap.set(centroidsIndexes[i], []); 
  } 

  dataset.forEach((color: string) => {
    const rayon = +color.split(',')[0];
    const nearest = centroidsIndexes.reduce((a: string, b: string) => {
      return Math.abs(+b.split(',')[0] - rayon) < Math.abs(+a.split(',')[0] - rayon) ? b : a;
    })
    centroidMap.get(nearest).push(color);
  });
  return centroidMap;
}

function updateCentroids(centroidMap: Map<string, Array<string>>) {
  var newCentroidMap = new Map();
  centroidMap.forEach((value, _key) => {
    const totalHue = value.reduce((partialSum, a) => partialSum + +a.split(',')[0], 0) / value.length;
    const totalS = value.reduce((partialSum, a) => partialSum + +a.split(',')[1], 0) / value.length;
    const totalL = value.reduce((partialSum, a) => partialSum + +a.split(',')[2], 0) / value.length;
    const totalA = value.reduce((partialSum, a) => partialSum + +a.split(',')[3], 0) / value.length;

    const newCentroid = `${totalHue}, ${totalS}%, ${totalL}%, ${totalA}`;
    newCentroidMap.set(newCentroid, []); 
  });
}

function createNewSpanColor(parentDom: HTMLElement, color: string) {
  const newDiv = document.createElement("span");
  newDiv.style.width = 20 + "px";
  newDiv.style.height = 20 + "px";
  newDiv.style.background = `hsla(${color})`;
  newDiv.classList.add("color-analyser");
  parentDom.appendChild(newDiv);
}

function sortColorSetHue(colorPalette: Set<string>): Set<string> {
  const tmp = [...colorPalette].sort((a, b) => +a.split(',')[0] - +b.split(',')[0]);
  return new Set(tmp);
}

function majorColors(hslArray: Array<(number)[]>): Set<string> {
  const colorSet: Set<string> = new Set();

  for (const color of hslArray) {
    colorSet.add(`${color[0]}, ${color[1]}%, ${color[2]}%, ${color[3]}`);
  }
  return colorSet;
}

function fromImageDataToColorArray(clampedArray: Uint8ClampedArray, translationFunction: Function) {
  var colorArray: Array<(number)[]> = [];
  for (let i = 0; i <= clampedArray.length; i = i + 4) {
    if (clampedArray[i + 1] > 25 && clampedArray[i + 2] > 20 && clampedArray[ i + 3] > 0.1) {
      colorArray.push(translationFunction(clampedArray[i], clampedArray[i + 1], clampedArray[ i + 2], clampedArray[ i + 3]))
    }
  }
  return colorArray;
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

function rgbToHsl2(r: number, g: number, b: number, a: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
    a / 100
  ];
};
// TMP END

