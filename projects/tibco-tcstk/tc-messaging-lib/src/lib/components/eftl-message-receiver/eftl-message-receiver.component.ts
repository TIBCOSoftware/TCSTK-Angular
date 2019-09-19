import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EFTLService} from '../../services/e-ftl.service';

@Component({
  selector: 'tcmsg-eftl-message-receiver',
  templateUrl: './eftl-message-receiver.component.html',
  styleUrls: ['./eftl-message-receiver.component.css']
})
export class EftlMessageReceiverComponent implements OnChanges {

  @Input() wssUrl: string;

  @Input() apiKey: string;

  @Input() clientId: string;

  @Input() matcher: string;

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
