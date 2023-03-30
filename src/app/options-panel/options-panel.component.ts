import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColorFormatCastService } from '../color-format-cast.service';
import { KmeansAlgoService } from '../kmeans-algo.service';

@Component({
  selector: 'app-options-panel',
  templateUrl: './options-panel.component.html',
  styleUrls: ['./options-panel.component.less']
})
export class OptionsPanelComponent {
  analysisType: string = '';
  saturation: number = 0;
  luminosity: number = 0;
  loop_limit: number = 5;
  
  private centroidNumber: number = 8;
  
  public globalColors: string[] = [];

  @Input() datas: Uint8ClampedArray = new Uint8ClampedArray();
  @Input() disable: boolean = true;

  @Output() kMeansColor = new EventEmitter<Array<string>>;

  constructor(private kmeansService: KmeansAlgoService,
    private colorCastService: ColorFormatCastService) {}

  getState(selectedValue: string) {
    this.analysisType = selectedValue;
  }

  getSaturation(selectedValue: number) {
    this.saturation = selectedValue;
  }

  getLuminosity(selectedValue: number) {
    this.luminosity = selectedValue;
  }

  getSelection(selection: number) {
    this.loop_limit = selection;
  }

  launchAnalyse() {            
    this.globalColors = [];
    let hslArray = this.fromImageDataToColorArray(this.datas, this.colorCastService.rgbToHsl2); //rgbToHsl);
    if (this.analysisType === "quality") {
      this.kmeansService.setUpService(this.saturation, this.luminosity);
      hslArray = this.kmeansService.cleanColorArrayDuplicates(hslArray);
    }
    
    const centroids = this.kmeansService.initCentroids(hslArray, this.centroidNumber);
    let centroidMap = this.kmeansService.fillCentroidsDataset(hslArray, centroids);
    let newCentroid = new Map<string, Array<number[]>>();
    let limitIndex = 0;
    while (true || limitIndex < this.loop_limit) {
      newCentroid = this.kmeansService.updateCentroids(centroidMap);
      if (!this.kmeansService.isSameCentroids(centroidMap, newCentroid)) {
        centroidMap = this.kmeansService.fillCentroidsDataset(hslArray, [...newCentroid.keys()]);
      } else {
        break;
      }
      limitIndex += 1;
    }
    console.log("centroids", newCentroid);
    for (const [colorkey, colorSet] of newCentroid) {
      const totalS = colorSet.reduce((partialSum, a) => {
        return partialSum + a[1];
      }, 0) / colorSet.length;
      const totalL = colorSet.reduce((partialSum, a) => partialSum + a[2], 0) / colorSet.length;
      const totalA = colorSet.reduce((partialSum, a) => partialSum + a[3], 0) / colorSet.length;
      const newColor = `${colorkey.split(',')[0]}, ${totalS}%, ${totalL}%, ${totalA}`;

      this.globalColors.push(newColor);
    }
    this.kMeansColor.emit(this.globalColors);
  }

  private fromImageDataToColorArray(clampedArray: Uint8ClampedArray, translationFunction: Function): Array<number[]> {
    const colorArray: Array<number[]> = [];
    for (let i = 0; i <= clampedArray.length; i = i + 4) {
      if (clampedArray[i + 1] > 25 && clampedArray[i + 2] > 20 && clampedArray[ i + 3] > 0.1) {
        colorArray.push(translationFunction(clampedArray[i], clampedArray[i + 1], clampedArray[ i + 2], clampedArray[ i + 3]))
      }
    }
    return colorArray;
  }
}
