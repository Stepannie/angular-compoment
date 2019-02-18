import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoadingIconModule } from './component/loading-icon/loading-icon.module';
import { TipModule } from './component/tip/tip.module';

const SHARED_MODULE = [NgZorroAntdModule,LoadingIconModule,TipModule]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SHARED_MODULE
  ],
  exports:[...SHARED_MODULE]
})
export class ShareModule { }
