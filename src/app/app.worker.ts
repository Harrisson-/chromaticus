/// <reference lib="webworker" />

const calculation = {
    analyzeImageData: (hslArray: Array<number[]>, setupAlgo: any): Map<string, Array<number[]>> => {
        const centroids = initCentroids(hslArray, setupAlgo.centroidNumber);
        let centroidMap = fillCentroidsDataset(hslArray, centroids);
        let newCentroid = new Map();
        let limitIndex = 0;
        while (true || limitIndex < setupAlgo.loopLimit) {
            newCentroid = updateCentroids(centroidMap);
            if (!isSameCentroids(centroidMap, newCentroid)) {
            centroidMap = fillCentroidsDataset(hslArray, [...newCentroid.keys()]);
            } else {
            break;
            }
            limitIndex += 1;
        }
        return newCentroid; 
    }
};

addEventListener('message', ({ data }) => {
  postMessage({ key: "loading", value: true });
  if (Object.keys(calculation).includes(data.method)) {
    postMessage({
      value: calculation.analyzeImageData([...data.hslArray], data.setupAlgo),
    });
  } else {
    // POST ERROR MESSAGE
    // postMessage({
    //   key: "error",
    //   value: `No calculation found ${data.method ? `for type ${data.method}` : ''}`,
    // });
  }
  postMessage({ key: "loading", value: false });
});

const defaultSetup = {
    centroidNumber: 8,
    loopLimit: 5,
}

const initCentroids = (dataset: Array<number[]>, k: number): Array<string> => {
    const colorArray = [...dataset];
    const centroidIndexes = [];
    let index;
    while (centroidIndexes.length < k) {
        index = colorArray[(Math.floor(Math.random() * (colorArray.length - 0) + 0))]; // colorArray.length
        centroidIndexes.push(index.toString());
    }
    return centroidIndexes;
}

const fillCentroidsDataset = (dataset: Array<number[]>, centroidsIndexes: Array<string>): Map<string, Array<number[]>> => {
    var centroidMap = new Map();
    centroidsIndexes.forEach(centroid => centroidMap.set(centroid.toString(), []));      

    dataset.forEach((color) => {
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

const updateCentroids = (centroidMap: Map<string, Array<number[]>>):Map<string, Array<number[]>> => {
    const newCentroidMap = new Map();
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

const isSameCentroids = (centroids: Map<string, Array<number[]>>, newCentroids: Map<string, Array<number[]>>) => {
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

const roundToZero = (value: number) => {
    return Math.round((value + Number.EPSILON) * 1) / 1
}
