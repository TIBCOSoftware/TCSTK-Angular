import { Component, OnInit } from '@angular/core';
import { parse, unparse } from 'papaparse';
import { LiveAppsService, ProcessId, Process } from '@tibco-tcstk/tc-liveapps-lib';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { ProcessDiscoveryConfig } from '../../models/tc-process-discovery-config';
import { map } from 'rxjs/operators';
import { TcDocumentService } from '@tibco-tcstk/tc-liveapps-lib';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

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

    // Internal fields
    public sandboxId: number;
    // private applicationId: string;
    private pdConfiguration: ProcessDiscoveryConfig;

    // 
    public datasourceType: string;
    public file: File;
    public filename: string = '';
    public data;
    public displayedColumns: string[];
    public mapping: Mapping[] = [];

    // Field to start the case
    public analysisName: string;
    public analysisDescription: string;
    public inputType: string; 

    // Options for parsing
    public useFirstRowAsHeader: boolean = true;
    public skipComments: boolean = false;
    public comments: string = '//'
    public columnSeparator: string;
    public preview: boolean = true;
    public numberRowsForPreview: number = 5;
    public skipEmptyLines: boolean = true;
    public encoding: string = 'UTF-8';
    public dateTimeFormat: string = 'YYYY-MM-DD HH:mm:ss.SSS';
    public quoteChar: string = '"';
    public escapeChar: string = '"';

    // JDBC
    // public jdbcUsername: string;
    // public jdbcPassword: string;
    // public jdbcType: string;
    // public jdbcHostname: string;
    // public jdbcPort: number;
    // public jdbcDatabaseName: string;
    // public jdbcSQLQuery: string;
    
    // Mappings
    public caseId: string;
    public activity: string;
    public start: string;
    public end: string;
    public resource: string[];
    public other: string[];

    // stepper
    isLinear = false;

    private action: Process;
    private creator: Process;

    // Upload
    public uploadProgress: number = 0;

    constructor(
        private liveapps: LiveAppsService, 
        private documentService: TcDocumentService,
        private pdService: PdProcessDiscoveryService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.sandboxId = Number(this.route.snapshot.data.claims.primaryProductionSandbox.id).valueOf();
        this.pdConfiguration = this.route.snapshot.data.processDiscovery;
        this.liveapps.getCaseTypeSchema(this.sandboxId, this.pdConfiguration.datasourceAppId, 100).
            pipe(
                map(types => {
                    const app = types.casetypes.filter(casetype => casetype.id === '1')[0];
                    this.creator = app.creators.filter(creator => creator.id === this.pdConfiguration.creatorAppId)[0];
                    this.action = app.actions.filter(action => action.id === this.pdConfiguration.validateActionAppId)[0];
                    console.log("+ ", JSON.stringify(this.creator));
                })
            );
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

    public moveNextTab = (currentTab: number): void => {
        if (currentTab == 1 && this.preview && this.inputType === 'csv'){
            this.refreshCSV();
        }
        if (currentTab == 1 && this.preview && this.inputType === 'json') {
            this.refreshJSON();
        }
    }

    public refreshJSON = (): void => {
        const reader = new FileReader();
        reader.onload = (data: any) => {
            const jsonData = unparse(data.target.result);
            let config = {
                quoteChar: this.quoteChar,
                escapeChar: this.escapeChar,
                header: this.useFirstRowAsHeader,
                preview: this.numberRowsForPreview,
                encoding: this.encoding,
                comments: (this.skipComments) ? this.comments: '',
                complete: (result) => {
                    this.displayedColumns = this.calculateColumnNames(
                        this.useFirstRowAsHeader ? Object.keys(result.data[0]).length: result.data[0].length, 
                        this.useFirstRowAsHeader ? result.meta.fields: undefined);
                    this.data = result.data;
                    this.columnSeparator = result.meta.delimiter;
                },
                skipEmptyLines: this.skipEmptyLines
            };
            const result = parse(jsonData, config);
        }

        reader.readAsText(this.file);
    }

    public refreshCSV = ():void => {
        let config = {
            quoteChar: this.quoteChar,
            escapeChar: this.escapeChar,
            header: this.useFirstRowAsHeader,
            preview: this.numberRowsForPreview,
            encoding: this.encoding,
            comments: (this.skipComments) ? this.comments: '',
            complete: (result) => {
                this.displayedColumns = this.calculateColumnNames(
                    this.useFirstRowAsHeader ? Object.keys(result.data[0]).length: result.data[0].length, 
                    this.useFirstRowAsHeader ? result.meta.fields: undefined);
                this.data = result.data;
                this.columnSeparator = result.meta.delimiter;
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

    public enabledButtonTab = (tab: number): boolean => {

        if (tab == 1){
            // inputType not selected
            if (!this.inputType) return true;

            // inputtype = CSV
            if (this.inputType === 'csv'){
                if (this.analysisName && this.analysisDescription && this.file) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    handleSubmit = () => {

        let data = {
            DiscoverAnalysisConfig: {
                AnalysisName: this.analysisName,
                AnalysisDescription: this.analysisDescription,
                InputType: this.inputType,
                CSVSchema: {
                    ColumnName: this.displayedColumns
                },
                CSVOptions: {
                    headers: this.useFirstRowAsHeader ? 'true' : 'false',
                    headerBasedParser: this.useFirstRowAsHeader ? 'true' : 'false',
                    separator: this.columnSeparator,
                    quoteChar: this.quoteChar,
                    escapeChar: this.escapeChar,
                    datetimeFormat: this.dateTimeFormat
                },
                FileOptions: {
                    FileName: this.file.name,
                    FilePath: this.pdConfiguration.hdfsRootPath + '/<folder>/' + this.file.name
                },
                EventMap: {
                    case_id: this.caseId,
                    activity_id: this.activity,
                    resource_id: this.resource,
                    activity_start_time: this.start,
                    activity_end_time: this.end,
                    otherAttributes: this.other.toString()
                },
                SDSBackend: {
                    Status: '',
                    SDSProcessId: '',
                    'auto-checkInterval': 2
                }
            }
        }

        this.liveapps.runProcess(this.sandboxId, this.pdConfiguration.datasourceAppId, this.pdConfiguration.creatorAppId, undefined, data).
            pipe(
                map(response => {
                    if (response) {
                        if (!response.data.errorMsg) {
                            // parse data to object
                            response.data = JSON.parse(response.data);
                            // case created send back response including caseIdentifier if one is present
                            let caseIdentifier;
                            let caseReference;
                            if (response.caseIdentifier) {
                                caseIdentifier = response.caseIdentifier;
                            }
                            if (response.caseReference) {
                                caseReference = response.caseReference;
                                data.DiscoverAnalysisConfig.FileOptions.FilePath = data.DiscoverAnalysisConfig.FileOptions.FilePath.replace('<folder>', caseIdentifier);
                            }
                            
                            // upload the document to the case
                            if (this.pdConfiguration.storeToLiveApps) {
                                this.documentService.uploadDocument('caseFolders', caseReference, this.sandboxId, this.file, this.file.name, "Datasource definition for ").
                                    pipe(
                                        map(response3 => {
                                            console.log("*** File upload: ", response3);
                                        })
                                    ).subscribe();
                            }

                            if (this.pdConfiguration.storeToHDFS) {
                                if (1){
                                    const datasourceId = response.caseIdentifier;
                                    this.pdService.uploadFileHDFS(this.pdConfiguration.hdfsHostname, datasourceId,  this.pdConfiguration.hdfsRootPath, this.file).subscribe(
                                        response => {
                                            if (response.type == HttpEventType.UploadProgress) {
                                                    this.uploadProgress = Math.round(100 * response.loaded / response.total);
                                            }
                                            if (this.uploadProgress == 100) {
                                                this.snackBar.open('File uploaded correctly', 'OK', {
                                                    duration: 3000
                                                });
                                                this.router.navigate(['/starterApp/configuration/process-discovery-administration']);
                                            }
                                            console.log(" 2*** ",    response);
                                        },
                                        error => {
                                            console.log("ERRROR: ", error)
                                        }
                                    )
                                } else {
                                    const datasourceId = response.caseIdentifier;
                                    const url = this.pdConfiguration.hdfsHostname + this.pdConfiguration.hdfsRootPath + '/' + datasourceId + '/' + this.filename;
                                    this.pdService.uploadFileHDFS2(url, this.pdConfiguration.hdfsUsername, this.pdConfiguration.hdfsPermision, this.pdConfiguration.hdfsOverwriteFile, this.file).subscribe(
                                        response => {
                                            console.log(" 2 ******* ", response);
                                        },
                                        error => {
                                            console.log("ERRROR: ", error)
                                        }
                                    );
                                }
                            }

                            // this.layout = undefined;
                            // this.liveapps.runProcess(this.sandboxId, this.pdConfiguration.datasourceAppId, this.pdConfiguration.validateActionAppId, caseReference, data).
                            //     pipe(
                            //         map(response2 => {
                            //             console.log("Response2 ", response2);
                            //         })
                            //     ).subscribe();
                        } else {
                            console.error('Unable to run case creator');
                            console.error(response.data.errorMsg);
                        }
                    }
                })
            ).subscribe(
                success => success,
                error => console.log("******error: ", error)
            );

    }
    
}

//     icons = [
//         // { id: 'Cancel', icon: 'close'},
//         { id: 'CaseId', icon: 'label'},
//         { id: 'Activity', icon: 'start'},
//         { id: 'Start', icon: 'timer'},
//         { id: 'End', icon: 'timer_off'},
//         { id: 'Resource', icon:'account_box'},
//         { id: 'Other', icon: 'swap_vert'}
//     ];

//     todo = [
//         'Cancel',
//         'Case ID',
//         'Activity',
//         'Start',
//         'End',
//         'Resource',
//         'Other'
//     ];

//     done = [
//         'Walk dog'
//     ];

//     drop(event: CdkDragDrop<string[]>) {
//         if (event.previousContainer === event.container) {
//             moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//         } else {
//             transferArrayItem(event.previousContainer.data,
//                 event.container.data,
//                 event.previousIndex,
//                 event.currentIndex);
//         }
//     }
//     onListDrop(event: CdkDragDrop<string[]>) {
//         // Swap the elements around
//         console.log("******* Drop");
//  //       moveItemInArray(this.myArray, event.previousIndex, event.currentIndex);
//     }
