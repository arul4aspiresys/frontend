import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastSVC: ToastrService
  ) { }

  success(msg: string, title: string) {
    this.toastSVC.success(msg, title);
  }

  error(msg: string, title: string) {
    this.toastSVC.error(msg, title);
  }

  warning(msg: string, title: string) {
    this.toastSVC.warning(msg, title);
  }

  info(msg: string, title: string) {
    this.toastSVC.info(msg, title);
  }
}
