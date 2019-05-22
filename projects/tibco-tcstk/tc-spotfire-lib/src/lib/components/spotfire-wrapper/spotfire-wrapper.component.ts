import { Component, OnInit } from '@angular/core';
import { SpotfireViewerComponent } from '@tibco/spotfire-wrapper';
// import { SpotfireCustomization } from '@tibco/spotfire-wrapper/lib/spotfire-customization';

@Component({
    selector: 'tcsf-spotfire-wrapper',
    templateUrl: './spotfire-wrapper.component.html',
    styleUrls: ['./spotfire-wrapper.component.css']
})
export class SpotfireWrapperComponent extends SpotfireViewerComponent implements OnInit {
    // No var please (or set a contructor)
    ngOnInit(): void {
        this.showPage(this.page);
    }

    showPage(page: string) {
        this.page = page;
        this.display();
    }
}
