import { Injectable } from '@angular/core';

// TODO: DELETE UNUSED FUCTION
@Injectable({
  providedIn: 'root'
})
export class KmeansAlgoService {

  _luminosity: number = 1;
  _saturation: number = 40;
  _centroidNumber: number = 8;
  _loopLimit: number = 5;

  constructor() {}

  setCentroidNumber(value: number) {
    this._centroidNumber = value;
  }
  
  setLoopTime(value: number) {
    this._loopLimit = value;
  }
  
  setUpService(saturation: number, luminosity: number): void {
    this._saturation = saturation;
    this._luminosity = luminosity;
  }

  initCentroids(dataset: Array<number[]>, k: number): Array<string> {
    const colorArray = [...dataset];
    const centroidIndexes = [];
    let index;
    while (centroidIndexes.length < k) {
      index = colorArray[(Math.floor(Math.random() * (colorArray.length - 0) + 0))]; // colorArray.length
      centroidIndexes.push(index.toString());
    }
    return centroidIndexes;
  }
  
  fillCentroidsDataset(dataset: Array<number[]>, centroidsIndexes: Array<string>): Map<string, Array<number[]>> {
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

  updateCentroids(centroidMap: Map<string, Array<number[]>>):Map<string, Array<number[]>>  {
    var newCentroidMap = new Map();
    centroidMap.forEach((value, key) => {
      const totalHue = value.reduce((partialSum, a) => partialSum + +a[0], 0) / value.length;
      
      const totalS = value.reduce((partialSum, a) => partialSum + +a[1], 0) / value.length;
      const totalL = value.reduce((partialSum, a) => partialSum + +a[2], 0) / value.length;
      const newCentroid = `${totalHue}, ${totalS}%, ${totalL}%, 1`;
      if (this.roundToZero(+key.split(',')[0]) !== this.roundToZero(totalHue)) {
        newCentroidMap.set(newCentroid, []);
      } else {
        newCentroidMap.set(newCentroid, value);
      }
    });
    return newCentroidMap; 
  }

  isSameCentroids(centroids: Map<string, Array<number[]>>, newCentroids: Map<string, Array<number[]>>) {
    const centroidKeys = [...centroids.keys()];
    const newCentroiKeys = [...newCentroids.keys()];
    if (newCentroiKeys.length !== centroidKeys.length) {
      return false;
    }
    for (let index = 0; index < newCentroiKeys.length; index++) {
      if (this.roundToZero(+centroidKeys[index].split(',')[0]) !== this.roundToZero(+newCentroiKeys[index].split(',')[0])) {
        return false;
      }
    }
    return true;
  }

  cleanColorArrayDuplicates(colorArray: Array<number[]>): Array<number[]> {
    let sortedArray: Array<number[]> = [];
    for (let i = 0; i < colorArray.length; i++) {
      if (sortedArray.length === 0 || !this.isElemIsIn2DArray(sortedArray, colorArray[i])) {
        sortedArray.push(colorArray[i]);
      }
    }
    return sortedArray;
  }

  isElemIsIn2DArray(arrayToSearchIn: Array<number[]>, elem: number[]) {
    let findElem: boolean = false;
    for (let lineIndex = 0; lineIndex < arrayToSearchIn.length; lineIndex++){
      if (elem[0] + 360 < arrayToSearchIn[lineIndex][0] + 2 + 360 &&
        elem[0] + 360 > arrayToSearchIn[lineIndex][0] - 2 + 360) { // 10 = tolérance
          
          if (elem[1] < arrayToSearchIn[lineIndex][1] + this._saturation &&
            elem[1] > arrayToSearchIn[lineIndex][1] - this._saturation) {
              
            if (elem[2] < arrayToSearchIn[lineIndex][2] + this._luminosity &&
              elem[2] > arrayToSearchIn[lineIndex][2] - this._luminosity ) {

              findElem = true;
              break;
            }
          }
      }
    };
    return findElem;
  }

  roundToZero(value: number) {
    return Math.round((value + Number.EPSILON) * 1) / 1
  }

  analyzeImageData(hslArray: Array<number[]>): Map<string, Array<number[]>> {
    const centroids = this.initCentroids(hslArray, this._centroidNumber);
    let centroidMap = this.fillCentroidsDataset(hslArray, centroids);
    let newCentroid = new Map<string, Array<number[]>>();
    let limitIndex = 0;
    while (true || limitIndex < this._loopLimit) {
      newCentroid = this.updateCentroids(centroidMap);
      if (!this.isSameCentroids(centroidMap, newCentroid)) {
        centroidMap = this.fillCentroidsDataset(hslArray, [...newCentroid.keys()]);
      } else {
        break;
      }
      limitIndex += 1;
    }
    return newCentroid; 
  }
  
}
