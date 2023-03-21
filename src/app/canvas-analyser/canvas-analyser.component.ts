import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-canvas-analyser',
  templateUrl: './canvas-analyser.component.html',
  styleUrls: ['./canvas-analyser.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CanvasAnalyserComponent {
  private colorDegree: Array<number> = []; 
  private CANVAS_SIZE = 500;
  private centroidNumber: number = 8;
  private quantity: boolean = false;
  
  public globalColors: string[] = [];
  constructor() {};

  ngOnInit() {
    const canvas = document.getElementById('viewport') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    let img = new Image();
    const size = this.CANVAS_SIZE;
    img.onload = () => {
      if (context) {
        const ratio = img.width / img.height;
        canvas.width = size;
        canvas.height = size / ratio;
    
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const datas = context.getImageData(0, 0, canvas.width, canvas.height);
        let hslArray = fromImageDataToColorArray(datas.data, rgbToHsl2);//rgbToHsl);
        if (!this.quantity) {
          hslArray = cleanColorArrayDuplicates(hslArray);
        }
        
        const centroids = initCentroids(hslArray, this.centroidNumber);
        let centroidMap = fillCentroidsDataset(hslArray, centroids);
        let newCentroid = new Map<string, Array<number[]>>();
        while (true) {
          newCentroid = updateCentroids(centroidMap);
          if (!isSameCentroids(centroidMap, newCentroid)) {
            centroidMap = fillCentroidsDataset(hslArray, [...newCentroid.keys()]);
          } else {
            break;
          }
        }
        console.log("prout", newCentroid);
        for (const [colorkey, colorSet] of newCentroid) {
          const totalS = colorSet.reduce((partialSum, a) => {
            return partialSum + a[1];
          }, 0) / colorSet.length;
          const totalL = colorSet.reduce((partialSum, a) => partialSum + a[2], 0) / colorSet.length;
          const totalA = colorSet.reduce((partialSum, a) => partialSum + a[3], 0) / colorSet.length;
          const newColor = `${colorkey.split(',')[0]}, ${totalS}%, ${totalL}%, ${totalA}`;

          this.globalColors.push(newColor);
        }
      }
    }
    img.src = "./assets/vaporeon.png";
  }
}

function initCentroids(dataset: Array<number[]>, k: number): Array<string> {
  const colorArray = [...dataset];
  const centroidIndexes = [];
  let index;
  while (centroidIndexes.length < k) {
    index = colorArray[(Math.floor(Math.random() * (colorArray.length - 0) + 0))]; // colorArray.length
    centroidIndexes.push(index.toString());
  }
  return centroidIndexes;
}

function fillCentroidsDataset(dataset: Array<number[]>, centroidsIndexes: Array<string>): Map<string, Array<number[]>> {
  var centroidMap = new Map();
  centroidsIndexes.forEach(centroid => centroidMap.set(centroid.toString(), []));      

  dataset.forEach((color: number[]) => {
    const rayon = color[0];
    if (centroidsIndexes.length > 0) {
      const nearest = [...centroidsIndexes.values()].reduce((a, b) => {
        return Math.abs(+b.split(',')[0] - rayon) < Math.abs(+a.split(',')[0] - rayon) ? b : a;
      }) // A REVOIR
      centroidMap.get(nearest).push(color);
    }
  });
  return centroidMap;
}

function updateCentroids(centroidMap: Map<string, Array<number[]>>):Map<string, Array<number[]>>  {
  var newCentroidMap = new Map();
  centroidMap.forEach((value, key) => {
    const totalHue = value.reduce((partialSum, a) => partialSum + +a[0], 0) / value.length;
    
    const totalS = value.reduce((partialSum, a) => partialSum + +a[1], 0) / value.length;
    const totalL = value.reduce((partialSum, a) => partialSum + +a[2], 0) / value.length;
    const newCentroid = `${totalHue}, ${totalS}%, ${totalL}%, 1`;
    if (roundToZero(+key.split(',')[0]) !== roundToZero(totalHue)) {
      newCentroidMap.set(newCentroid, []);
    } else {
      newCentroidMap.set(newCentroid, value);
    }
  });
  return newCentroidMap; 
}

function isSameCentroids(centroids: Map<string, Array<number[]>>, newCentroids: Map<string, Array<number[]>>) {
  const centroidKeys = [...centroids.keys()];
  const newCentroiKeys = [...newCentroids.keys()];
  if (newCentroiKeys.length !== centroidKeys.length) {
    return false;
  }
  for (let index = 0; index < newCentroiKeys.length; index++) {
    if (roundToZero(+centroidKeys[index].split(',')[0]) !== roundToZero(+newCentroiKeys[index].split(',')[0])) {
      return false;
    }
  }
  return true;
}

function majorColors(hslArray: Array<(number)[]>): Set<string> {
  const colorSet: Set<string> = new Set();

  for (const color of hslArray) {
    colorSet.add(`${color[0]}, ${color[1]}%, ${color[2]}%, ${color[3]}`);
  }
  return colorSet;
}

function cleanColorArrayDuplicates(colorArray: Array<number[]>): Array<number[]> {
  let sortedArray: Array<number[]> = [];
  for (let i = 0; i < colorArray.length; i++) {
    if (sortedArray.length === 0 || !isElemIsIn2DArray(sortedArray, colorArray[i])) {
      sortedArray.push(colorArray[i]);
    }
  }
  return sortedArray;
}

function isElemIsIn2DArray(arrayToSearchIn: Array<number[]>, elem: number[]) {
  let findElem: boolean = false;
  for (let lineIndex = 0; lineIndex < arrayToSearchIn.length; lineIndex++){
    if (elem[0] + 360 < arrayToSearchIn[lineIndex][0] + 2 + 360 &&
      elem[0] + 360 > arrayToSearchIn[lineIndex][0] - 2 + 360) { // 10 = tolérance
        
        if (elem[1] < arrayToSearchIn[lineIndex][1] + 1 &&
          elem[1] > arrayToSearchIn[lineIndex][1] - 1) {
            
          if (elem[2] < arrayToSearchIn[lineIndex][2] + 40 &&
            elem[2] > arrayToSearchIn[lineIndex][2] - 40 ) {
          
            findElem = true;
            break;
          }
        }
    }
  };
  return findElem;
}

function fromImageDataToColorArray(clampedArray: Uint8ClampedArray, translationFunction: Function): Array<number[]> {
  const colorArray: Array<number[]> = [];
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

