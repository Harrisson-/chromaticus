import { Component, Input } from '@angular/core';
import { ColorFormatCastService } from '../color-format-cast.service';

@Component({
  selector: 'app-color-block',
  templateUrl: './color-block.component.html',
  styleUrls: ['./color-block.component.less'],
  inputs: ['colors'],
  providers: [ColorFormatCastService]
})
export class ColorBlockComponent {
  @Input() color: string = '';

  public hexaCode: string = '';

  constructor(private colorFormat: ColorFormatCastService) {}
  
  ngOnInit(){
    let [h, s, l] = this.color.split(',');
    this.hexaCode = this.colorFormat.hslToHex(+h, +s.slice(0, -1), +l.slice(0, -1));
  }

  public copyColor() {
    navigator.clipboard.writeText(this.hexaCode);
  }
}
