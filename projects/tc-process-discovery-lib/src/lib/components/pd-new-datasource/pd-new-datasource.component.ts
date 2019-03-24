import { Component, OnInit } from '@angular/core';
import { parse } from 'papaparse';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


export interface Mapping {
    columnName: string,
    options: string[]    
}

@Component({
    selector: 'tcpd-pd-new-datasource',
    templateUrl: './pd-new-datasource.component.html',
    styleUrls: ['./pd-new-datasource.component.css']
})
export class PdNewDatasourceComponent implements OnInit {

    public file: File;
    public filename: string = '';
    public data;
    public displayedColumns: string[];
    public mapping: Mapping[] = [];

    // Options for parsing
    public useFirstRowAsHeader: boolean = true;
    public skipComments: boolean = false;
    public comments: string = '//'
    public columnSeparator: string;
    public preview: boolean = true;
    public numberRowsForPreview: number = 5;

    constructor() { }

    ngOnInit() {
    }

    public calculateColumnNames = (numColumns: number, columnNames: string[]): string[] => {
        let newColumnNames: string[] = [];

        for (let index = 0; index < numColumns; index++){
            const columnName = this.useFirstRowAsHeader ? columnNames[index] : '' + index;
            const newElement: Mapping = {
                columnName: columnName,
                options: []
            };
            this.mapping.push(newElement);
            newColumnNames.push(columnName);
        }
        return newColumnNames;
    }

    public onFileSelect = (fileList: File[]): void => {
        this.file = fileList[0];
        this.filename = this.file.name;
        if (this.preview){
            this.refresh();
        }
    }

    public refresh = ():void =>{
        let config = {
            header: this.useFirstRowAsHeader,
            preview: this.numberRowsForPreview,
            comments: (this.skipComments) ? this.comments: '',
            complete: (result) => {
                console.log("***** In");
                this.displayedColumns = this.calculateColumnNames(
                    this.useFirstRowAsHeader ? Object.keys(result.data[0]).length: result.data[0].length, 
                    this.useFirstRowAsHeader ? result.meta.fields: undefined);
                this.data = result.data;
            }
        };
        parse(this.file, config);
    }
    public setComments = ($event): void => {
        if (!this.skipComments){
            this.comments = '';
        }
    }

    icons = [
        { id: 'Cancel', icon: 'close'},
        { id: 'CaseId', icon: 'label'},
        { id: 'Activity', icon: 'start'},
        { id: 'Start', icon: 'timer'},
        { id: 'End', icon: 'timer_off'},
        { id: 'Resource', icon:'account_box'},
        { id: 'Other', icon: 'swap_vert'}
    ];

    todo = [
        'Cancel',
        'Case ID',
        'Activity',
        'Start',
        'End',
        'Resource',
        'Other'
    ];

    done = [
        'Walk dog'
    ];

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }
    onListDrop(event: CdkDragDrop<string[]>) {
        // Swap the elements around
        console.log("******* Drop");
 //       moveItemInArray(this.myArray, event.previousIndex, event.currentIndex);
    }
}
