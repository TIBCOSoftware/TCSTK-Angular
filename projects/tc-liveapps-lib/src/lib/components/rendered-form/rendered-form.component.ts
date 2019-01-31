import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';

@Component({
  selector: 'tcla-rendered-form',
  templateUrl: './rendered-form.component.html',
  styleUrls: ['./rendered-form.component.css']
})
export class RenderedFormComponent implements OnInit, OnChanges {
  @Input() schema: any = {};
  @Input() layout: any[] = [];
  @Input() data: any = {};
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  formSchema: any;
  formLayout: any[];
  formData: any;

  submitForm = (data: any) => {
    this.formSubmit.emit(data);
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // handle input param changes
    if (changes.schema && changes.schema.currentValue && (changes.schema.currentValue !== changes.schema.previousValue)) {
      const tmpSchema = changes.schema.currentValue;
      if (changes.schema.currentValue.$schema) {
        delete tmpSchema.$schema;
      }
      this.formSchema = tmpSchema;
      console.log(JSON.stringify(this.formSchema));
    }
    if (changes.data && changes.data.currentValue && (changes.data.currentValue !== changes.data.previousValue)) {
      this.formData = this.data;
    }
    if (changes.layout && changes.layout.currentValue && (changes.layout.currentValue !== changes.layout.previousValue)) {
      this.formLayout = this.layout;
    }
  }


}
