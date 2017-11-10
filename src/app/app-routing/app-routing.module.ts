import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { FirstPageComponent } from '../first-page/first-page.component';
import { MainPageRouteActivator } from 'app/main-page/main-page-route-activator.service';
    
const routes: Routes = [

    {
        path: 'first-page',
        component: FirstPageComponent,
    },
    {
        path: 'first-page/:N/:M',
        component: FirstPageComponent,
    },
    {
      path: 'main-page/:N/:M',
      component: MainPageComponent,
      canActivate: [MainPageRouteActivator]
    },
    {
        path: '',
        redirectTo: '/first-page',
        pathMatch: 'full'
    },
    { 
        path: '**', 
        redirectTo: '/first-page', 
        pathMatch: 'full' 
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }