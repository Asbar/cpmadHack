import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { formsPage } from '../pages/forms/forms';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { ListDetailPage } from '../pages/list-detail/list-detail';
import { OrderListDetailPage } from '../pages/Order-List-Detail/Order-List-Detail';
import { CartPage } from '../pages/cart/cart';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

@NgModule({
  declarations: [
    MyApp,
    formsPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListDetailPage,
    TutorialPage,
    LoginPage,
    SignupPage,
    OrderListDetailPage,
    CartPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    formsPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListDetailPage,
    TutorialPage,
    LoginPage,
    SignupPage,
    OrderListDetailPage,
    CartPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
