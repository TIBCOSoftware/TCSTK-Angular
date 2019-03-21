import {Component, Input, OnInit} from '@angular/core';
import {ServiceHandlerService} from '../../services/service-handler.service';
import {MatTableDataSource} from '@angular/material';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'tccwm-double-list-for-selection',
  templateUrl: './double-list-for-selection.component.html',
  styleUrls: ['./double-list-for-selection.component.css']
})
export class DoubleListForSelectionComponent implements OnInit {

 // @Input() appIds: string[];
  @Input() sandboxId: number;


  public objList = [];

  public caseList;

  private serviceHandler: ServiceHandlerService;

  displayedColumns: string[] = ['DemandeID', 'Payeur', 'NumeroDossier', 'StatutDemande',  'Select'];
  selectionDisplayedColumns: string[] = ['Select', 'DemandeID', 'Decision'];

  public dataSource;
  public selectionDataSource;


  public selectionList = [];

  constructor(serviceHandler: ServiceHandlerService) {
    this.serviceHandler = serviceHandler;
  }

  ngOnInit() {
    // TODO remove hard coded stuffs
    const serviceObservable = this.serviceHandler.getCases( this.sandboxId, '2550', '1', 0, 900);
    serviceObservable.subscribe( result => {
        console.log('CASES : ' + result);

        this.objList = result.caseinfos;
        for (const obj of this.objList) {
          obj.casedataObj = JSON.parse(obj.casedata);
          if (obj.casedataObj.Dossier && obj.casedataObj.Dossier.Statut === "Saisie en cours - complet") {
            obj.casedataObj.preco = true;
          } else {
            obj.casedataObj.preco = false;
          }
        }


        this.dataSource = new MatTableDataSource(this.objList);
        this.selectionDataSource = new MatTableDataSource(this.selectionList);


      },
      error => {
        alert('ERROR GETTING CASE');
      });

  }


  onAreaListControlChanged(obj, index) {
    // determine selected options
    this.objList.splice(index, 1);
    this.dataSource._updateChangeSubscription();

    obj.selectedForDecision = true;
    this.selectionList.push(obj);
    this.selectionDataSource._updateChangeSubscription();
  }

  onSelectionListControlChanged(obj, index) {
    // determine selected options
    this.selectionList.splice(index, 1);
    this.selectionDataSource._updateChangeSubscription();

    obj.selectedForDecision = false;
    this.objList.unshift(obj);
    this.dataSource._updateChangeSubscription();
  }

  unselectAll() {
    for (const obj of this.selectionList) {
      this.objList.unshift(obj);
    }
    // this.objList.concat(this.selectionList);
    this.selectionList.splice(0, this.selectionList.length);

    this.dataSource._updateChangeSubscription();
    this.selectionDataSource._updateChangeSubscription();

  }


  selectAllPreco() {
    let index = 0;
    let refreshTable = false;
    for (const obj of this.objList) {
      if (obj.casedataObj.preco) {
        this.objList.splice(index, 1);
        this.selectionList.push(obj);
        refreshTable = true;
      }
      index ++;
    }
    if (refreshTable) {
      this.dataSource._updateChangeSubscription();
      this.selectionDataSource._updateChangeSubscription();

    }
  }

  decisionForAll(decisionValue: string) {
    for (const obj of this.selectionList) {
      obj.casedataObj.decision = decisionValue;
    }
    this.selectionDataSource._updateChangeSubscription();

  }

}
