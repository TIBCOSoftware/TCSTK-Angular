/**
 * @ngdoc component
 * @name RenderedFormComponent
 *
 * @description
 * `<tcfrm-rendered-form>` is a component providing the ability to reneder a form using the third party angular6-json-form library.
 *
 * @usage
 *
 * This component is used by tc--liveapps-lib to render forms based on a JSON schema that is supplied by the liveapps API
 *
 * It is located into this dedicated library to make it easier to plug in an alternative form rendering library
 *
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {JsonSchemaFormComponent, MaterialDesignFrameworkModule} from 'angular6-json-schema-form';

@Component({
  selector: 'tcfrm-rendered-form',
  templateUrl: './rendered-form.component.html',
  styleUrls: ['./rendered-form.component.css']
})
export class RenderedFormComponent implements OnInit, OnChanges {
  @Input() schema: any = {};
  @Input() layout: any[] = [];
  @Input() data: any = {};
  @Input() options: any[];
  @Input() customFormId: string;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  formSchema: any;
  formLayout: any[];
  formData: any;

  submitForm = (data: any) => {
    this.formSubmit.emit(data);
  }

  handleLayoutOutput = (layout: any) => {
    console.log('Layout:');
    console.log(JSON.stringify(layout));
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // handle input param changes
    if (changes.schema && changes.schema.currentValue && (changes.schema.currentValue !== changes.schema.previousValue)) {
      const tmpSchema = changes.schema.currentValue;
      // json-schema-form doesnt like the $schema and wont parse the schema if it is present. So remove it.
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
