import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EFTLService} from '../../services/e-ftl.service';

/**
 * Sample receiver component for Tibco Web Messaging
 *
 * See Tibco Cloud Messaging docs for parameter information
 *
 *@example <tcmsg-eftl-message-receiver></tcmsg-eftl-message-receiver>
 */

@Component({
  selector: 'tcmsg-eftl-message-receiver',
  templateUrl: './eftl-message-receiver.component.html',
  styleUrls: ['./eftl-message-receiver.component.css']
})
export class EftlMessageReceiverComponent implements OnChanges {

  /**
   * Web messaging URL
   */
  @Input() wssUrl: string;

  /**
   * API Key
   */
  @Input() apiKey: string;

  /**
   * Client Id for subscription
   */
  @Input() clientId: string;

  /**
   * Matcher string
   */
  @Input() matcher: string;

  /**
   * Durable Name
   */
  @Input() durable: string;

  public messages: any[] = [];

  constructor(protected eFTLService: EFTLService) {
  }

  public configure = () => {
    if (!this.eFTLService.connection) {
      this.eFTLService.connect(this.wssUrl, this.apiKey, this.clientId).subscribe(
        next => {
          this.eFTLService.receiveMessage(this.matcher, this.durable).subscribe(
            next2 => {
              this.messages.push(next2);
            }
          );
        }
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.wssUrl.currentValue && changes.apiKey.currentValue && changes.clientId.currentValue) {
      this.configure();
    }
  }

}
