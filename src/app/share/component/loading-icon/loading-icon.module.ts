import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIconComponent } from './page/loading-icon.component';
import { LoadingIconService } from './loading-icon.service';

@NgModule({
  declarations: [LoadingIconComponent],
  imports: [
    CommonModule
  ],
  providers:[LoadingIconService],
  exports:[LoadingIconComponent]
})
export class LoadingIconModule { }
