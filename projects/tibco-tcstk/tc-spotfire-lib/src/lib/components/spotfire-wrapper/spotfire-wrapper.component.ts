import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SpotfireViewerComponent } from '@tibco/spotfire-wrapper';
// import { SpotfireCustomization } from '@tibco/spotfire-wrapper/lib/spotfire-customization';

@Component({
  selector: 'tcsf-spotfire-wrapper',
  templateUrl: './spotfire-wrapper.component.html',
  styleUrls: ['./spotfire-wrapper.component.css']
})

export class SpotfireWrapperComponent extends SpotfireViewerComponent implements OnInit {
  @Output() handleInfoMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleErrorMessage: EventEmitter<string> = new EventEmitter<string>();

  private superDisplayErrorMessage = this.displayErrorMessage;
  private superDisplayInfoMessage = this.displayInfoMessage;

  // No var please (or set a contructor)
  ngOnInit(): void {
    this.showPage(this.page);
  }

  showPage(page: string) {
    this.page = page;
    this.display();
  }

  /**
   * @description
   * Display error message in the DOM content of the spotfire-wrapper
   * This function can be overriden
   * @param message error message to be displayed
   */
  protected displayErrorMessage = (message: string) => {
    this.superDisplayErrorMessage(message);
    this.handleErrorMessage.emit(message);
  }

  /**
   * @description
   * Display info message if debug mode is set in the DOM content of the spotfire-wrapper
   * This function can be overriden
   * @param message INfo message to be displayed
   */
  protected displayInfoMessage = (message: string) => {
    this.superDisplayInfoMessage(message);
    this.handleInfoMessage.emit(message);
  }
}
