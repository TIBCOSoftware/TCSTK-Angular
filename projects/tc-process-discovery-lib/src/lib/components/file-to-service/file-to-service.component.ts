import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '@angular/common';
import {TcSharedStateService} from 'tc-core-lib';
import {Observable} from 'rxjs';
import {SandboxList} from 'tc-liveapps-lib';
import {map, tap} from 'rxjs/operators';
import {ServiceDetails} from '../../models/process-discovery';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {PreviewDataDialogComponent} from '../preview-data-dialog/preview-data-dialog.component';
import {NotificationSnackBarComponent} from '../notification-snack-bar/notification-snack-bar.component';

@Component({
  selector: 'tcpd-file-to-service',
  templateUrl: './file-to-service.component.html',
  styleUrls: ['./file-to-service.component.css']
})
export class FileToServiceComponent implements OnInit, OnChanges {

  public serviceFullUrl;

  @Input()  serviceDetails: ServiceDetails;






  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.serviceDetails
      && changes.serviceDetails.currentValue && (changes.serviceDetails.currentValue !== changes.serviceDetails.previousValue)) {
      this.serviceFullUrl = this.serviceDetails.apiUrl + this.serviceDetails.operation;

    }
  }



  openDialog(jsonDataFromFile) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;



    dialogConfig.data = {
      id: 1,
      description: 'You are using service details for : ' + this.serviceDetails.label,
      jsonData: jsonDataFromFile
    };

    dialogConfig.height = '80%';
    dialogConfig.width = '80%';


    const dialogRef = this.dialog.open(PreviewDataDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
       data => this.handleDialogClose(data, jsonDataFromFile)
    );
  }

  handleDialogClose (data, jsonDataFromFile) {
    console.log('Dialog output:', data);
    if (data === 'save') {
      this.createCallService(jsonDataFromFile);
    }
  }




  public callService(serviceBody: String): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set( 'Accept', 'application/json');




    return this.http.post(this.serviceFullUrl, serviceBody, {headers})
      .pipe(
        map ( result => this.openSnackBar(result)));
  }

  openSnackBar(result: any) {
    // TODO handle error
    const message = 'File imported correctly : ' + result.nbCreated + ' lines created';
    const actionButtonLabel = 'Close';

    this.snackBar.open( message, actionButtonLabel , {
    });
  }


  createCallService(objArray: any) {
    const serviceInput = {};
    console.log('Array Obj : ' + JSON.stringify(objArray, null, 2 ));
    serviceInput[this.serviceDetails.rootObjectName] = objArray;
    console.log('serviceInput : ' + JSON.stringify(serviceInput, null, 2 ));
    // Call service
    // TODO handle error
    // TODO handle OK confirmation
    const serviceObservable = this.callService(JSON.stringify(serviceInput));
    serviceObservable.subscribe();


  }



  onFileSelect(input: HTMLInputElement) {

    const files = input.files;

    if (files && files.length) {
      /*
       console.log("Filename: " + files[0].name);
       console.log("Type: " + files[0].type);
       console.log("Size: " + files[0].size + " bytes");
       */



      // Reading first file
      const fileToRead = files[0];
      let fileReader ;
      fileReader = new FileReader();



      // Function to create Service Input
      // TODO changed this to parameter function
      fileReader.onload = (e) => {
        console.log(fileReader.result);
        const fileString  = fileReader.result.toString();

        const lines = fileString.split('\r\n');
        console.log(lines.length);

        const attributes = lines[0].split(';');

        const objArray = [];

        for (let i = 1; i < lines.length; i++) {
          const curLine = lines[i].split(';');
          const obj = {};
          for (let j = 0 ; j < curLine.length ; j++ ) {

            obj[attributes[j]] = curLine[j];
          }
          objArray.push(obj);

        }


        this.openDialog(objArray);


      }
      fileReader.readAsText(fileToRead);

    }

  }

}
