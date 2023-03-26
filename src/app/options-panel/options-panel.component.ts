import { Component } from '@angular/core';

@Component({
  selector: 'app-options-panel',
  templateUrl: './options-panel.component.html',
  styleUrls: ['./options-panel.component.less']
})
export class OptionsPanelComponent {
  analysisType: string = '';

  getState(selectedValue: string) {
    this.analysisType = selectedValue;
  }
}
