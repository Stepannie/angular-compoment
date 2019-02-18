import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './interceptor/custom-reuse-strategy';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonInterceptor } from './interceptor/common-interceptor';

const GUARD_PROVIDERS = [
  AuthService,
  AuthGuard
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`)
    }
  }

  static forFoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...GUARD_PROVIDERS,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true }
      ]
    }
  }
}
