import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private notification: NzNotificationService) { }

  showAlert(message: string, type: string = "error") {
    if (type == 'error') this.notification.create("error", 'Error !', message);
    if (type == 'success') this.notification.create("success", 'Success !', message);
    if (type == 'info') this.notification.create("info", 'Info !', message);
  }

}
