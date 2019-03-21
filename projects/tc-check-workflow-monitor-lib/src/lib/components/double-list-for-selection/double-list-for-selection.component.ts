import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ServiceHandlerService} from '../../services/service-handler.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'tccwm-double-list-for-selection',
  templateUrl: './double-list-for-selection.component.html',
  styleUrls: ['./double-list-for-selection.component.css']
})
export class DoubleListForSelectionComponent implements OnInit {

 // @Input() appIds: string[];
  @Input() sandboxId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private csvSeparator = ';';


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
          if (obj.casedataObj.Dossier && obj.casedataObj.Dossier.Statut === 'Saisie en cours - complet') {
            obj.casedataObj.preco = true;
          } else {
            obj.casedataObj.preco = false;
          }
        }


        this.dataSource = new MatTableDataSource(this.objList);
        this.dataSource.paginator = this.paginator;

        this.selectionDataSource = new MatTableDataSource(this.selectionList);


      },
      error => {
        alert('ERROR GETTING CASE');
      });

  }



  private getRealIndex (paginator: MatPaginator, index) {
    return (this.paginator.pageIndex * this.paginator.pageSize) + index;
  }


  onAreaListControlChanged(obj, index) {
    // determine selected options
    const realIndex = this.getRealIndex(this.paginator, index);
    this.objList.splice(realIndex, 1);
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


  private refreshDataSources () {
    this.dataSource._updateChangeSubscription();
    this.selectionDataSource._updateChangeSubscription();
  }

  unselectAll() {
    for (const obj of this.selectionList) {
      this.objList.unshift(obj);
    }
    // this.objList.concat(this.selectionList);
    this.selectionList.splice(0, this.selectionList.length);

    this.refreshDataSources();

  }


  selectAllPreco() {
    let index = 0;
    const indexToSplice = [];
    let refreshTable = false;
    for (const obj of this.objList) {
      if (obj.casedataObj.preco) {
        this.selectionList.push(obj);
        refreshTable = true;
        indexToSplice.unshift(index);
      }
        index ++;
    }
    if (refreshTable) {
      for (const curI of indexToSplice) {
        this.objList.splice(curI, 1);
      }
      this.refreshDataSources();
    }
  }


  selectAll() {
    for (const obj of this.objList) {
      this.selectionList.push(obj);
    }
    this.objList.splice(0, this.objList.length);
    this.refreshDataSources();
  }

  decisionForAll(decisionValue: string) {
    for (const obj of this.selectionList) {
      obj.casedataObj.decision = decisionValue;
    }
    //  this.selectionDataSource._updateChangeSubscription();

  }


  debugSelection() {
     console.log(JSON.stringify(this.selectionList[0].casedataObj, null, 2));
    let csvContent = 'Banque;Compte d\'encaissement (bénéficiaire);Date accord encaissement;N du chèque client;ZONE 3;ZONE 2;Montant du chèque;Contrat';
    for (const obj of this.selectionList) {
      csvContent = csvContent + '\\n';
      const casedataObj = obj.casedataObj;
      const curLine = casedataObj.Banque + this.csvSeparator +
                      '???' + this.csvSeparator +
                      '???' + this.csvSeparator +
                      casedataObj.Numrodechque + this.csvSeparator +
                      '???' + this.csvSeparator +
                      '???' + this.csvSeparator +
                      casedataObj.Montant + this.csvSeparator +
                      '???' + this.csvSeparator;
      csvContent = csvContent + curLine;
    }
    console.log(csvContent);

  }

}
