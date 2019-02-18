import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import { ShareModule } from './share/share.module';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    ShareModule,
    AppRoutingModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
