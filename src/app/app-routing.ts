import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ThingyDeviceComponent} from './thingy-device/thingy-device.component';
import {StatisticsComponent} from './statistics/statistics.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'thingy', component: ThingyDeviceComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRouting {

}
