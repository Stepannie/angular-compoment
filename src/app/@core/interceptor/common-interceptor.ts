import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TipService } from 'src/app/share/component/tip/tip.service';
import { LoadingIconService } from 'src/app/share/component/loading-icon/loading-icon.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
    private _authService: AuthService;
    constructor(private inject: Injector, private tipSvc: TipService,
        private loadingIconService: LoadingIconService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._authService = this.inject.get(AuthService);
        this.loadingIconService.loading(true);
        let authReq;
        if (this._authService.getToken()) {
            authReq = req.clone({
                headers: req.headers.set('Authorization', this._authService.getToken()),
                params: req.params.set('_t', new Date().getTime().toString())
            });
        } else {
            authReq = req.clone({ headers: req.headers.set('_t', new Date().getTime().toString()) });
        }
        return next.handle(authReq).pipe(map(event => {
            if (event instanceof HttpResponse) {
                this.loadingIconService.loading(false);
            }
            return event;
        }), catchError((error) => {
            this.loadingIconService.loading(false);
            // 针对下载的特殊处理
            if (req.url.endsWith('export=true')) {
                return throwError(error);
            }
            switch (error.status) {
                case 0:
                    this.tipSvc.error({ title: '提示', content: '网络不可用，请设置你的网络' });

                    break;
                case 400:
                    this.tipSvc.error({ title: '提示', content: '请求失败，请稍后重试！' });
                    break;
                case 401:
                    // 移除缓存
                    // this.router.navigate(['/account/session/signin'], { queryParams: { returnUrl: this.router.url } });
                    this.tipSvc.error({ title: '提示', content: '没有权限,请重新登录' });
                    break;
                case 403:
                    this.tipSvc.error({ title: '提示', content: '未授权路径！' });

                    break;
                case 404:
                    this.tipSvc.error({ title: '提示', content: '链接不存在！' });

                    break;
                case 500:
                    this.tipSvc.error({ title: '提示', content: '服务器错误，请稍后重试！' });
                    break;
                default:
                    // this.tipSvc.error('未知错误，请联系管理员！');
                    this.tipSvc.error({ title: '提示', content: '未知错误，请联系管理员！' });

            }
            return throwError(error);
        })) as any;
    }
}