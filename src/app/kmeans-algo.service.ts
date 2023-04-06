import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KmeansAlgoService {

  _luminosity: number = 1;
  _saturation: number = 40;

  constructor() {}
  
  setUpService(saturation: number, luminosity: number): void {
    this._saturation = saturation;
    this._luminosity = luminosity;
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

  private isElemIsIn2DArray(arrayToSearchIn: Array<number[]>, elem: number[]) {
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
}
