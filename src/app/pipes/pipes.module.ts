import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitazerPipe } from './dom-sanitazer.pipe';
import { ImgSanitizerPipe } from './img-sanitizer.pipe';



@NgModule({
  declarations: [DomSanitazerPipe, ImgSanitizerPipe],
  exports: [DomSanitazerPipe, ImgSanitizerPipe]
})
export class PipesModule { }
