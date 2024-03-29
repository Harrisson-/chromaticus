import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorBlocksComponent } from './color-blocks/color-blocks.component';
import { ColorBlockComponent } from './color-block/color-block.component';
import { OptionsPanelComponent } from './options-panel/options-panel.component';
import { ChromaticusCanvasComponent } from './chromaticus-canvas/chromaticus-canvas.component';
import { ChromaticusBtnComponent  } from './chromaticus-btn/chromaticus-btn.component';
import { ToggleBtnComponent } from './toggle-btn/toggle-btn.component';
import { ChromaticusSelectBtnComponent } from './chromaticus-select-btn/chromaticus-select-btn.component';
import { ChromaticusRangeBtnComponent } from './chromaticus-range-btn/chromaticus-range-btn.component';
import { LoopLoaderComponent } from './loop-loader/loop-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorBlocksComponent,
    ColorBlockComponent,
    OptionsPanelComponent,
    ChromaticusCanvasComponent,
    ChromaticusBtnComponent,
    ToggleBtnComponent,
    ChromaticusSelectBtnComponent,
    ChromaticusRangeBtnComponent,
    LoopLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
