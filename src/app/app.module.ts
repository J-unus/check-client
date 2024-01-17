import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {WebSocketService} from "./web-socket/web-socket.service";
import {webSocketServiceFactory} from "./web-socket/web-socket-service-factory";
import {FormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'et',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: WebSocketService,
      useFactory: webSocketServiceFactory,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
