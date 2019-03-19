import { Component, OnInit } from '@angular/core';
import { SpotfireViewerComponent } from 'spotfire-webplayer';
import { SpotfireCustomization } from 'spotfire-webplayer/lib/spotfire-customization';

@Component({
    selector: 'tcsf-mc-spotfire-wrapper',
    templateUrl: './mc-spotfire-wrapper.component.html',
    styleUrls: ['./mc-spotfire-wrapper.component.css']
})
export class McSpotfireWrapperComponent 
extends SpotfireViewerComponent
implements OnInit {
    // No var please (or set a contructor)
    ngOnInit(): void {
        //    pages = ['Sales performance', 'Territory analysis', 'Effect of promotions'];
        this.showPage(this.page);
        this.markingEvent.subscribe(
            e => console.log('MARKING MySpot', e)
        );
    }

    showPage(page: string) {
        this.page = page;
        console.log('Show', this.url, this.path, this.page);
        this.display();
    }
}