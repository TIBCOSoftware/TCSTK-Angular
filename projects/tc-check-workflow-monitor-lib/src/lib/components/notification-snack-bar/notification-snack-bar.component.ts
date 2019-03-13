import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tcpd-notification-snack-bar',
  templateUrl: './notification-snack-bar.component.html',
  styleUrls: ['./notification-snack-bar.component.css']
})
export class NotificationSnackBarComponent implements OnInit {

  message: string;

  constructor() {
    //this.message = message;
  }

  ngOnInit() {
  }

}
