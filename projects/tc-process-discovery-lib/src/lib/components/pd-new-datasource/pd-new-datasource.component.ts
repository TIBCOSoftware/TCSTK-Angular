import { Component, OnInit } from '@angular/core';
import { parse } from 'papaparse';

@Component({
    selector: 'tcpd-pd-new-datasource',
    templateUrl: './pd-new-datasource.component.html',
    styleUrls: ['./pd-new-datasource.component.css']
})
export class PdNewDatasourceComponent implements OnInit {

    public file: File;
    public useFirstRowAsHeader: boolean;
    public columnSeparator: string;
    public numberRowsForPreview: number;
    public data;

    // public parseCharacter: string;
    // public endString: string;
    // public showPreview: boolean;
    
    constructor() { }

    ngOnInit() {
        this.numberRowsForPreview = 15;
    }

    public onFileSelect = ($event: any): void => {
        this.file = $event.files[0];

        let config = {
            preview: this.numberRowsForPreview,
            complete: (result) => {
                console.log("Lines: " + result.data.length);
                this.data = result.data;
            }
        };

        parse(this.file, config);



 
    }

}
