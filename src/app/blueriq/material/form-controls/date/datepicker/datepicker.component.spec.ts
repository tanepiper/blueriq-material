import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../../../generic/element/element.component';
import { MaterialModule } from '../../../material.module';
import { PresentationStyles } from '../../../presentationstyles/presentationstyles';
import { MomentTransformer } from '../moment-transformer';
import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<DatepickerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent, ElementComponent],
      providers: [BlueriqComponents.register([DatepickerComponent]), MomentTransformer],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.date().styles(PresentationStyles.MATERIAL);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a bq-element', () => {
    const bqElement = component.nativeElement.querySelector('bq-element');
    expect(bqElement).toBeTruthy();
  });

  it('should be disabled', () => {
    field.styles(PresentationStyles.DISABLED, PresentationStyles.MATERIAL);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });

  it('should be read only', () => {
    field.readonly();
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(DatepickerComponent);

    const inputField = component.nativeElement.querySelector('.mat-form-field-disabled');
    expect(inputField).toBeTruthy();
  });
});