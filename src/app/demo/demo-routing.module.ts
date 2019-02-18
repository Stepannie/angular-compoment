import { Routes, RouterModule } from "@angular/router";
import { DemoComponent } from './demo.component';
import { NgModule } from '@angular/core';

const route: Routes = [
    {
        path: '',
        children: [{
            path: '',
            pathMatch: 'full',
            redirectTo: 'demo'
        }, {
            path: 'demo',
            component: DemoComponent
        }]
    }
];
@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }