import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';
import { ShareModule } from '../share/share.module';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    ShareModule
  ]
})
export class DemoModule { }
