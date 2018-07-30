import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStylesNew } from '../../PresentationStylesNew';

@Component({
  selector: 'bq-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: '.' + PresentationStylesNew.TOGGLE + '[dataType=boolean]'
})
export class SlideToggleComponent {

  formControl = this.form.control(this.field, {
    syncOn: 'update',
    ifUnknown: false,
    disableWhen: PresentationStylesNew.DISABLED
  });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }
}