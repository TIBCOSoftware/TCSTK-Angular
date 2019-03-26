import { Component, OnInit } from '@angular/core';
import { parse } from 'papaparse';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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

    public datasourceType: string;
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
    public skipEmptyLines: boolean = true;
    public encoding: string = 'UTF-8';

    // JDBC
    public jdbcUsername: string;
    public jdbcPassword: string;
    public jdbcType: string;
    public jdbcHostname: string;
    public jdbcPort: number;
    public jdbcDatabaseName: string;
    public jdbcSQLQuery: string;
    
    // Mappings
    public caseId: string;
    public activity: string;
    public start: string;
    public end: string;
    public resource: string[];
    public other: string[];

    // stepper
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
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
    }

    public moveNextTab = ($event): void => {
        if (this.preview){
            this.refresh();
        }
    }

    public refresh = ():void =>{
        let config = {
            header: this.useFirstRowAsHeader,
            preview: this.numberRowsForPreview,
            encoding: this.encoding,
            comments: (this.skipComments) ? this.comments: '',
            complete: (result) => {
                this.displayedColumns = this.calculateColumnNames(
                    this.useFirstRowAsHeader ? Object.keys(result.data[0]).length: result.data[0].length, 
                    this.useFirstRowAsHeader ? result.meta.fields: undefined);
                this.data = result.data;
            },
            skipEmptyLines: this.skipEmptyLines
        };
        parse(this.file, config);
    }
    public setComments = ($event): void => {
        if (!this.skipComments){
            this.comments = '';
        }
    }

    icons = [
        // { id: 'Cancel', icon: 'close'},
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
