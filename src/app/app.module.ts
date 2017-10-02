import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items'; 
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
// Configuration Firebase
import { FacebookModule } from 'ngx-facebook';
//Modulos Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DropdownService } from "../services/dropdown.service";
import { ConsultaCepService } from "../services/consulta-cep.service";
import { MaskShared } from "../shared/masks";
import { NativeGeocoder } from "@ionic-native/native-geocoder";
import { GoogleApis } from "../services/consulta-google-apis";
import { AuthServiceProvider } from "../providers/auth-service";
import { Facebook } from "@ionic-native/facebook";
import { UserService } from "../providers/database/database-providers";
import { DirectivesModule } from '../directives/directives.module';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyA3winfnztWrbW_k5U7PgRzOCldhPsXSDg",
  authDomain: "aguamineral-f4e5f.firebaseapp.com",
  databaseURL: "https://aguamineral-f4e5f.firebaseio.com",
  projectId: "aguamineral-f4e5f",
  storageBucket: "aguamineral-f4e5f.appspot.com",
  messagingSenderId: "259485126796"
};

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, 
    AngularFireAuthModule,
    FacebookModule.forRoot(),
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    Facebook,    
    DropdownService, 
    ConsultaCepService,
    MaskShared,
    Geolocation,
    NativeGeocoder,
    GoogleApis,
    UserService 
  ]
})
export class AppModule { }
