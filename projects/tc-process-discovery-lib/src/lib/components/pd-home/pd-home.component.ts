import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarButton, TcButtonsHelperService } from 'tc-core-lib';

@Component({
    selector: 'tcpd-pd-home',
    templateUrl: './pd-home.component.html',
    styleUrls: ['./pd-home.component.css']
})
export class PdHomeComponent implements OnInit {

    @Input() username : string;
    @Input() email: string;
    @Input() sandboxId: string;
    @Input() applicationId : number;
    @Input() typeId : string;
    viewsButtons: ToolbarButton[];
    @Output() caseCreated = new EventEmitter;

    private currentView : string;
    private currentRole : string;

    constructor(private router: Router, protected buttonsHelper: TcButtonsHelperService) { }

    ngOnInit() {
        this.viewsButtons = this.createToolbarButtons();

    }

    handleCaseCreation = (caseId: string) => {
        // case clicked - navigate to case
        // this.router.navigate(['/starterApp/case/' + caseId], {queryParams: {} });
        console.log("OK for handleCaseCreation");
      }

    public handleViewButtonEvent = (id : string) => {
        var id = id.toLocaleLowerCase().split(' ').join('-');
        console.log("ID: " + id);
        this.router.navigate(['/starterApp/pd/' + id], {});
        this.currentView = id;
    }

    protected createToolbarButtons = (): ToolbarButton[] => {
        const processMiningViewButton = this.buttonsHelper.createButton('1', '', true, 'Process Mining View', true, true);
        const caseViewButton = this.buttonsHelper.createButton('2', 'tcs-refresh-icon', true, 'Case View', true, true);
        const buttons = [ processMiningViewButton, caseViewButton ];
        return buttons;
      }
    
}