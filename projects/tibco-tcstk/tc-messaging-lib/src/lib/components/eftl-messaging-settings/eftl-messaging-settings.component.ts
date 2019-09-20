import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Claim, GeneralConfig, RoleAttribute, TibcoCloudNewElementComponent} from '@tibco-tcstk/tc-core-lib';
import {MatDialog, MatExpansionPanel, MatSnackBar, MatTab, MatTabGroup} from '@angular/material';
import {MessagingConfig} from '../../models/messaging-config';
import {EFTLConfigService} from '../../services/e-ftl-config.service';
import {MessagingConnection} from '../../models/messaging-connection';


/**
 * Component to manage configuration of Tibco Cloud Messaging connections
 *
 * ![alt-text](../messaging-settings.png "")
 *
 *@example <tcmsg-eftl-messaging-settings></tcmsg-eftl-messaging-settings>
 */
@Component({
  selector: 'tcmsg-eftl-messaging-settings',
  templateUrl: './eftl-messaging-settings.component.html',
  styleUrls: ['./eftl-messaging-settings.component.css']
})
export class EftlMessagingSettingsComponent implements OnInit {

  @ViewChildren(MatExpansionPanel) connectionPanels: QueryList<MatExpansionPanel>;

  public sandboxId: number;
  public claims: Claim;
  public generalConfig: GeneralConfig;
  public messagingConfig: MessagingConfig;
  public currentConnection: MessagingConnection;
  public newPanelId: string;
  public isAdmin = false;

  constructor(protected route: ActivatedRoute, protected messagingConfigService: EFTLConfigService, protected snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  protected getLiveAppsConfigService(): EFTLConfigService {
    return this.messagingConfigService;
  }

  public ngOnInit() {
    this.claims = this.route.snapshot.data.claims;
    const adminGroup = this.claims.primaryProductionSandbox.groups.find(group => {
      return group.type === 'Administrator';
    });
    this.isAdmin = adminGroup ? true : false;
    this.sandboxId = Number(this.claims.primaryProductionSandbox.id);
    this.generalConfig = this.route.snapshot.data.generalConfigHolder;
    this.messagingConfig = this.route.snapshot.data.messagingConfig ? this.route.snapshot.data.messagingConfig : { connections: [] };
  }

  deleteConnectionFunction = (): void => {
    this.messagingConfig.connections = this.messagingConfig.connections.filter(element => element.id !== this.currentConnection.id);
    this.currentConnection = undefined;
  }

  selectedConnection = (connection: MessagingConnection): void => {
    this.currentConnection = connection;
  }

  createConnectionFunction = (): void => {
    const dialogRef = this.dialog.open(TibcoCloudNewElementComponent, {
      panelClass: 'tcs-style-dialog',
      data: { resourceType: 'Messaging Connection', idReadOnly: true, id: this.messagingConfig.connections.length + 1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newConnection = new MessagingConnection().deserialize({id: result.id, name: result.name });
        // forces panel to open on creation
        this.newPanelId = result.id;
        this.messagingConfig.connections.push(newConnection);
      }
    });
  }

  public runSaveFunction = (): void => {
    if (this.messagingConfig.id) {
      // update existing config
      this.messagingConfigService.updateMessagingConfig(this.sandboxId, this.generalConfig.uiAppId, this.messagingConfig, this.messagingConfig.id).subscribe(
        result => {
          this.snackBar.open('Messaging configuration settings saved', 'OK', {
            duration: 3000
          });
        },
        error => {
          this.snackBar.open('Error saving messaging configuration', 'OK', {
            duration: 3000
          });
        }
      );
    } else {
      // create new config
      this.messagingConfigService.createMessagingConfig(this.sandboxId, this.generalConfig.uiAppId, this.messagingConfig).subscribe(
        next => {
          this.messagingConfig = next;
          this.snackBar.open('Messaging configuration settings saved', 'OK', {
            duration: 3000
          });
        },
        error => {
          this.snackBar.open('Error saving messaging configuration', 'OK', {
            duration: 3000
          });
        }
      );
    }
  }

  public clearMessagingConfig = () => {
    this.messagingConfigService.removeMessagingConfig(Number(this.messagingConfig.id)).subscribe(
      next => {
        this.messagingConfig = new MessagingConfig().deserialize({connections: []});
        this.snackBar.open('Messaging configuration settings cleared', 'OK', {
          duration: 3000
        });
      },
      error => {
        this.snackBar.open('Error clearing messaging configuration', 'OK', {
          duration: 3000
        });
      }
    );
  }

}
