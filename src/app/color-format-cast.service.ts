import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorFormatCastService {
  constructor() { }

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
  rgbToHsl(r: number, g: number, b: number){
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
    return [this.roundToZero(h), this.roundToZero(s * 100), this.roundToZero(l * 100)];
  }

  rgbToHsl2(r: number, g: number, b: number, a: number) {
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
  }

  hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  roundToZero(value: number) {
    return Math.round((value + Number.EPSILON) * 1) / 1
  }
}
