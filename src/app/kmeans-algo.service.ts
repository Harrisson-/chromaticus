import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KmeansAlgoService {

  // constructor() { }

  initCentroids(dataset: Array<number[]>, k: number): Array<string> {
    const colorArray = [...dataset];
    const centroidIndexes = [];
    let index;
    while (centroidIndexes.length < k) {
      index = colorArray[Math.floor(Math.random() * (colorArray.length - 0) + 0)];
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
      const newCentroid = `${totalHue}, 50%, 50%, 1`;
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

  roundToZero(value: number) {
    return Math.round((value + Number.EPSILON) * 1) / 1
  }
  
}
