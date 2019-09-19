import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EFTLService} from '../../services/e-ftl.service';

@Component({
  selector: 'tcmsg-eftl-message-sender',
  templateUrl: './eftl-message-sender.component.html',
  styleUrls: ['./eftl-message-sender.component.css']
})
export class EftlMessageSenderComponent implements OnChanges {

  @Input() wssUrl: string;

  @Input() apiKey: string;

  @Input() clientId: string;

  @Input() event: string;

  public connected = false;
  public msg: any = { contents: '' };

  constructor(private eFTLService: EFTLService) { }

  send = () => {
    this.eFTLService.sendMessage(this.msg.contents, this.event).subscribe(
      next => {
        console.log(next);
        this.msg.contents = undefined;
      }
    );
  }

  public configure = () => {
    if (!this.eFTLService.connection) {
      this.eFTLService.connect(this.wssUrl, this.apiKey, this.clientId).subscribe(
        next => {
          this.connected = true;
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
