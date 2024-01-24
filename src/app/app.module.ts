import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WebSocketService } from './web-socket/web-socket.service';
import { webSocketServiceFactory } from './web-socket/web-socket-service-factory';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotificationInterceptor } from './core/interceptor/notification.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { registerLocaleData } from '@angular/common';
import localeEt from '@angular/common/locales/et';
import localeEtExtra from '@angular/common/locales/extra/et';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'et' },
    { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
    {
      provide: WebSocketService,
      useFactory: webSocketServiceFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

function changeLocaleDateFormat(): void {
  const DATE = 10;
  const SHORT_DATE = 0;
  localeEt[DATE][SHORT_DATE] = 'dd.MM.yyyy';
}
changeLocaleDateFormat();
registerLocaleData(localeEt, 'et', localeEtExtra);
