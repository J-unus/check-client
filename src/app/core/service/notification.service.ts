import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastOptions = { closeButton: true };

  constructor(
    private toastService: ToastrService,
    private translateService: TranslateService,
  ) {}

  errorTranslate(error: string): void {
    this.translateService.get(error).subscribe((translation: string) => {
      this.error(translation);
    });
  }

  error(error: any): void {
    this.toastService.error(error, undefined, this.toastOptions);
  }
}
