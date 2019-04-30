import {Component, Input, OnInit} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';
import {TcCaseStatesService} from '../../services/tc-case-states.service';

@Component({
  selector: 'tcla-live-apps-milestone',
  templateUrl: './live-apps-milestone.component.html',
  styleUrls: ['./live-apps-milestone.component.css']
})
export class LiveAppsMilestoneComponent implements OnInit {
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
  @Input() status: string;
  @Input() label: string;
  @Input() isTerminal: boolean;
  @Input() phase: string;
  @Input() previousPhase: string;

  public sectionSVG: SafeHtml;
  public milestoneSvg: string;

  constructor(private caseStatesService: TcCaseStatesService) { }

  ngOnInit() {
    // work out which section the MS trailer is (first/middle/end)
    const section = this.isFirst ? 'first' : (this.isLast ? 'end' : 'middle');
    // construct the icon filename
    const svgFileName = section + '-section-' + this.status + '.svg';
    // work out correct class
    let bgClass;
    if (this.status === 'completed' && this.isTerminal) {
      bgClass = 'tc-ms-' + 'completed-terminal' + '-bg';
    } else {
      bgClass = 'tc-ms-' + this.status + '-bg';
    }
    this.milestoneSvg = 'tcs-milestone-' + this.status + (this.isTerminal ? '-terminal' : '');

    this.sectionSVG = this.caseStatesService.getMilestoneSectionSvg(this.label, 'tc-ms-label', bgClass, svgFileName);
  }

}
