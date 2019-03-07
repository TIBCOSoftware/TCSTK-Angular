import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tcsp-spotfire-play',
  templateUrl: './spotfire-play.component.html',
  styleUrls: ['./spotfire-play.component.css']
})
export class SpotfirePlayComponent implements OnInit {

  markingdata:any;

  constructor() { }

  ngOnInit() {
  }

  public marking(data){
    console.log("Marking: ");
    console.log(data);
    this.markingdata = JSON.stringify(data);
  }

}
