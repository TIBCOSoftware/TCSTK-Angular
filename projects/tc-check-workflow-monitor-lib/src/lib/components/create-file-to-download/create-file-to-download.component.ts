import {ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'tccwm-create-file-to-download',
  templateUrl: './create-file-to-download.component.html',
  styleUrls: ['./create-file-to-download.component.css']
})
export class CreateFileToDownloadComponent implements OnInit, OnChanges, DoCheck {

  @Input() objList;

  private oldSelectionListLength = 0;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {

    console.log(this.objList);

    const CSV = [
      '"1","val1","val2","val3","val4"',
      '"2","val1","val2","val3","val4"',
      '"3","val1","val2","val3","val4"'
    ].join('\n');

    window.URL = window.URL;

    const contentType = 'text/csv';

    const csvFile = new Blob([CSV], {type: contentType});

    const a = document.createElement('a');
    a.download = 'my.csv';
    a.href = window.URL.createObjectURL(csvFile);
    a.textContent = 'Download CSV';

    a.dataset.downloadurl = [contentType, a.download, a.href].join(':');

    const divParent = document.getElementById('downloadDivParent');

    divParent.appendChild(a);

  }

  ngOnChanges() {
    console.log(this.objList);
  }

  ngDoCheck() {
    if (this.objList.length !== this.oldSelectionListLength ) {
      this.cd.markForCheck();
      this.oldSelectionListLength = this.objList.length;

    }
  }



}
