import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasAnalyserComponent } from './canvas-analyser/canvas-analyser.component';
import { ColorBlocksComponent } from './color-blocks/color-blocks.component';
import { ColorBlockComponent } from './color-block/color-block.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasAnalyserComponent,
    ColorBlocksComponent,
    ColorBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
