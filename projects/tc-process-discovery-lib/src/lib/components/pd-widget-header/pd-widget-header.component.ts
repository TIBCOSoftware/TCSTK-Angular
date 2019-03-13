import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TibcoCloudWidgetHeaderComponent, ToolbarButton } from 'tc-core-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'tcpd-pd-widget-header',
  templateUrl: './pd-widget-header.component.html',
  styleUrls: ['./pd-widget-header.component.css']
})
export class PdWidgetHeaderComponent extends TibcoCloudWidgetHeaderComponent {
    @Input() datasource : string;
    @Input() sandboxId : number;
    @Input() applicationIds : number[];
    @Input() typeId : string;
    @Input() viewButtons: ToolbarButton[];
    @Input() toolbarButtons: ToolbarButton[];
    @Output() viewButtonEvent: EventEmitter<string> = new EventEmitter<string>();

    constructor(private router: Router){
        super();
    }

    handleToolbarButtonEvent(id){
        this.viewButtonEvent.emit(id);
    }
    
    toggleSidenav(id){

    }

    handleCaseCreation(id){
        
    }

    goSettings(){
        // Create Book logic
        this.router.navigate(['/starterApp/settings/general-application-settings']);
    }
    
  

}
