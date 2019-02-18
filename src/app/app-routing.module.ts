import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const route: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'demo'
    }, {
        path: 'demo',
        loadChildren: './demo/demo.module#DemoModule'
    }
];
const option = { useHash: true }
@NgModule({
    imports: [RouterModule.forRoot(route, option)],
    exports: [RouterModule]
})
export class AppRoutingModule { }