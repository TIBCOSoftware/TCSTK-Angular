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

    // TODO to put this back to specific calls

    // Handling purge
     if (this.result.mfpCount !== undefined  ) {
       this.message = this.result.mfpCount + ' cases ont été purgés';
     }

     // Handling created
       if (this.result.nbCreated !== undefined  ) {
         this.message = this.result.nbCreated + ' cases ont été créés';
       }

    // Handling treated
    if (this.result.nbTreated !== undefined  ) {
      this.message = this.result.nbTreated + ' cases ont été traités';
    }





  }

  closeSnack() {
    this.snackBarRef.dismiss();
  }

}
