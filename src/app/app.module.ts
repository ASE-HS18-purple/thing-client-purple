import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LoginComponent} from './login/login.component';
import {NavigationComponent} from './navigation/navigation.component';
import {AppRouting} from './app-routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './service/user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './welcome/welcome.component';
import {Authenticate} from './authentication/authenticate';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guard/auth.guard';
import {JwtInterceptor} from './guard/JwtInterceptor';
import {UnauthorizedRespInterceptor} from './guard/UnauthorizedRespInterceptor';
import { MqttBrokerConnectionComponent } from './mqtt-broker-connection/mqtt-broker-connection.component';
import {MqttBrokerConnectionService} from './service/mqtt-broker-connection.service';
import {ThingyDeviceService} from './service/thingy-device.service';
import { ThingyDeviceComponent } from './thingy-device/thingy-device.component';
import {ConfigureThingyDeviceComponent} from './thingy-device/configure-thingy-device/configure-thingy-device.component';
import { EditThingyDeviceComponent } from './thingy-device/edit-thingy-device/edit-thingy-device.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { DatePickerComponent } from './datetime-picker/date-picker/date-picker.component';
import { TemperatureChartComponent } from './statistics/temperature-chart/temperature-chart.component';
import { PressureChartComponent } from './statistics/pressure-chart/pressure-chart.component';
import { HumidityChartComponent } from './statistics/humidity-chart/humidity-chart.component';
import { AirQualityChartComponent } from './statistics/air-quality-chart/air-quality-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    NavigationComponent,
    WelcomeComponent,
    HomeComponent,
    MqttBrokerConnectionComponent,
    ThingyDeviceComponent,
    ConfigureThingyDeviceComponent,
    EditThingyDeviceComponent,
    StatisticsComponent,
    DatetimePickerComponent,
    DatePickerComponent,
    TemperatureChartComponent,
    PressureChartComponent,
    HumidityChartComponent,
    AirQualityChartComponent,
  ],
  entryComponents: [
    SignUpComponent,
    LoginComponent,
    ConfigureThingyDeviceComponent,
    EditThingyDeviceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouting,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    Authenticate,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedRespInterceptor, multi: true},
    MqttBrokerConnectionService,
    ThingyDeviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
