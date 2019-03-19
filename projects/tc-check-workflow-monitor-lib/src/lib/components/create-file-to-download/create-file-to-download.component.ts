import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tccwm-create-file-to-download',
  templateUrl: './create-file-to-download.component.html',
  styleUrls: ['./create-file-to-download.component.css']
})
export class CreateFileToDownloadComponent implements OnInit {

  constructor() { }

  ngOnInit() {

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



}
