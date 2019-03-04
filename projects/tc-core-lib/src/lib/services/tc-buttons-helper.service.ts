import { Injectable } from '@angular/core';
import {ToolbarButton} from '../models/tc-widget-header';

@Injectable({
  providedIn: 'root'
})
export class TcButtonsHelperService {

  constructor() { }

  public createButton = (
    id: string, icon: string, filled: boolean, tooltip: string, visible: boolean, enabled: boolean): ToolbarButton => {
    const newButton = new ToolbarButton().deserialize(
      {
        id: id,
        icon: icon,
        filled: filled,
        tooltip: tooltip,
        visible: visible,
        enabled: enabled
      }
    );
    return newButton;
  }

  public updateButtons = (updatedToolbarButtons: ToolbarButton[], toolbarButtons: ToolbarButton[]): ToolbarButton[] => {
    updatedToolbarButtons.forEach( updatedButton => {
      const idx = toolbarButtons.findIndex(item => item.id === updatedButton.id);
      if (idx > -1) {
        toolbarButtons[idx] = updatedButton;
      } else {
        // no existing button so add it
        toolbarButtons.push(updatedButton);
      }
    });
    return toolbarButtons;
  }

  public addButtons = (buttons: ToolbarButton[], toolbarButtons: ToolbarButton[]): ToolbarButton[] => {
    buttons.forEach(button => {
      toolbarButtons.push(button);
    });
    return toolbarButtons;
  }

  public removeButtons = (buttons: ToolbarButton[], toolbarButtons: ToolbarButton[]): ToolbarButton[] => {
    buttons.forEach(button => {
      const idx = toolbarButtons.findIndex(item => item.id === button.id);
      toolbarButtons.splice(idx, 1);
    });
    return toolbarButtons;
  }

}
