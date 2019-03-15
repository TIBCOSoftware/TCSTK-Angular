import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';

@Component({
  selector: 'tccwm-service-handler-snackbar',
  templateUrl: './service-handler-snackbar.component.html',
  styleUrls: ['./service-handler-snackbar.component.css']
})
export class ServiceHandlerSnackbarComponent implements OnInit {

  public message: string;
  private result: any;

  constructor(private snackBarRef: MatSnackBarRef<ServiceHandlerSnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.result = data;

  }

  ngOnInit() {
    console.log('SnackBar data : ' + JSON.stringify(this.result, null, 2));

    // Handling purge
     if (this.result.mfpCount !== undefined  ) {
       this.message = this.result.mfpCount + ' cases ont été purgés';
     }


  }

  closeSnack() {
    this.snackBarRef.dismiss();
  }

}
