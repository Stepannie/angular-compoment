import { Injectable } from "@angular/core";
import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {
    storedRoutes = new Map<string, DetachedRouteHandle>();
    constructor() { }
    // 1、页面离开后首先进入这一步，检查该路由是否需要进行存储，需要则进入第2步
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (!route.routeConfig) {
            return null;
        }
        // 判断是否在路由中的data属性配置canSave
        const canSave = !!route.data && !!(route.data as any).canSave;
        if (canSave) {
            return true;
        } else {
            return false;
        }
    }

    // 2、进入到第1步后返回true时，到达这一步对路由句柄进行存储
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        if (handle) {
            const routeName = this.getRouteName(route);
            this.storedRoutes.set(routeName, handle);
        }
    }

    // 3、页面进入时检查，查看该路由是否是缓存路由，当是已经缓存则返回true并进入第4步
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // 检查并调用存储history
        const canSave = !!route.data && !!(route.data as any).canSave;
        if (canSave) {
            const routeName = this.getRouteName(route);
            if (routeName) {
                return this.storedRoutes.has(routeName);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    // 4、当进入到第3步中返回true时，则从缓存路由中匹配当前路径去返回路由句柄
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        const canSave = !!route.data && !!(route.data as any).canSave;
        if (canSave) {
            const routeName = this.getRouteName(route);
            const reloadFlag = this.checkReloadFlag(route);
            // 检查已缓存的路由页面路径是否带有reload参数，若有则重载页面，PS:同一路由不生效
            if (reloadFlag) {
                this.storedRoutes.delete(routeName);
                return null;
            } else {
                return this.storedRoutes.get(routeName) || null;
            }

        }
        return null;
    }

    // 询问当前路由的快照是否可用于未来路由
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        const futureKey = this.getRouteName(future);
        const currentKey = this.getRouteName(curr);
        return futureKey === currentKey;
    }

    // 获取当前路由对应的完整路径作为路由存储唯一name
    private getRouteName(route: ActivatedRouteSnapshot): string {
        let next=route;
        let url=route.pathFromRoot.map(it=>this.getRouteURL(it)).join('/')+ '*';
        while(next.firstChild){
            next=next.firstChild;
            url+='/'+this.getRouteURL(next);
        }
        return url;
    }
     // 获取当前路由对应的完整路径--对应懒加载或者子路由的路径需要特殊获取
     private getRouteURL(route:ActivatedRouteSnapshot):string{
         if(route.url){
             if(route.url.length){
                 return route.url.join('/');
             }else{
                 if(typeof route.component==='function'){
                     return `[${route.component.name}]`;
                 }else if(typeof route.component==='string'){
                     return `[${route.component}]`;
                 }else{
                     return `[null]`;
                 }
             }
         }else{
             return `[null]`;
         }
     }

     // 检查路由路径是否带有reload参数
     private checkReloadFlag(route:ActivatedRouteSnapshot):boolean{
         const params=route && route.queryParams;
         return params && !! params['reload'];
     }
}
