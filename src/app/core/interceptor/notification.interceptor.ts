import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {NotificationService} from "../service/notification.service";

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  private readonly UNAUTHORIZED = 403;

  constructor(private notificationService: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if (response.status !== this.UNAUTHORIZED) {
            this.notificationService.errorTranslate('notification.requestFailed');
          } else {
            this.notificationService.errorTranslate('notification.loginForbidden');
          }
        }

        throw new Error(response);
      }));
  }
}
