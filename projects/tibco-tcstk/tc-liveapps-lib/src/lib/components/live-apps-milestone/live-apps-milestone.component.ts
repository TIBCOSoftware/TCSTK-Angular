import {Component, Input, OnInit} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';
import {TcCaseStatesService} from '../../services/tc-case-states.service';

/**
 * Render a dynamic milestone SVG
 *
 * ![alt-text](../live-apps-milestone.png "Documents Component Image")
 *
 *@example <tcla-live-apps-milestone></tcla-live-apps-milestone>
 */
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

  /**
   * Small rendering vs normal - defaults to normal
   */
  @Input() small: boolean;
  @Input() isTerminal: boolean;
  @Input() phase: string;
  @Input() previousPhase: string;

  public sectionSVG: SafeHtml;
  public milestoneSvg: string;
  public type: string;

  constructor(protected caseStatesService: TcCaseStatesService) { }

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
    if (this.isFirst || this.isLast) {
      this.type = 'end-ms';
    } else {
      this.type = 'middle-ms';
    }
    this.milestoneSvg = 'tcs-milestone-' + this.status + (this.isTerminal ? '-terminal' : '');

    this.sectionSVG = this.caseStatesService.getMilestoneSectionSvg(this.label, 'tc-ms-label', bgClass, svgFileName, this.small ? '16px' : undefined);
  }

}
