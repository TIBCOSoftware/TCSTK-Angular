# Documentation 
#### Angular App Development Basics
here a little HowTo of creating an Angular App and call a TIBCO Cloud Integration Flogo Service.
BUILD a new App using following commands

```bash
ng new cust-app

ng generate component CaseOverview

ng generate service api

ng generate class case --spec
```

now you can start implementing your App like in the below running Example.
Here just the main areas to highlight.

<b>TCI Flogo API Service call</b> 

```typescript
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL  =  'https://eu-west-1.integration.cloud.tibcoapps.com/gdggeqpx6pvcjsuybhfr2iylhtaom4xs';

  constructor(private  httpClient:  HttpClient) { }

  getCases() {
    return this.httpClient.get(`${this.API_URL}/cases`);
  }

}
```

<b>Component Implementation</b> 

```typescript
@Component({
  selector: 'app-case-overview',
  templateUrl: './case-overview.component.html',
  styleUrls: ['./case-overview.component.css']
})
export class CaseOverviewComponent implements OnInit {
  public cases: Array<Case> = [];
  constructor(private  apiService:  ApiService) { }

  ngOnInit() {
    this.getCases();
  }

  public getCases() {
    this.apiService.getCases().subscribe(
      (resp: any) => {
        this.cases  = JSON.parse(resp.data);

        console.log(resp);
    });
  }
}
```

now you are able to start your App

```bash
cd cust-app
ng serve --open --host 127.0.0.1 --proxy-config proxy.conf.json --ssl true
```

open URL e.g. 
http://127.0.0.1:4200/

#### running Sample
full Sample and Source hosted on Stackblitz

<embed height=400px width=750px src="https://stackblitz.com/edit/angular-tci-service-call?embed=1&file=src/app/app.component.ts"></embed>
