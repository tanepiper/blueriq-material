import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { FormattingModule } from '@blueriq/angular/formatting';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { BlueriqTestSession } from '@blueriq/angular/testing/src/test_session';
import { TextItemModule } from '@blueriq/angular/textitems';
import {
  ButtonTemplate,
  ContainerTemplate,
  FieldTemplate,
  StaticNodeTemplate,
  TextItemTemplate
} from '@blueriq/core/testing';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../material.module';
import { ButtonComponent } from '../button/button.component';
import { ReadonlyComponent } from '../readonly/readonly.component';
import { TextItemComponent } from '../textitem/textitem.component';
import { ListComponent } from './list.component';
import { ListModule } from './list.module';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let tableTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent, ReadonlyComponent, TextItemComponent],
      providers: [BlueriqComponents.register([ButtonComponent, ReadonlyComponent, TextItemComponent])],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormsModule,
        FormattingModule.forRoot(),
        ListModule,
        TextItemModule,
        SharedModule
      ]
    });
  }));

  beforeEach(() => {
    tableTemplate = ContainerTemplate.create();
    tableTemplate.contentStyle('table');
    // Simulate a table so the red-cow framework detects this and can be tested on.
    tableTemplate.children(
      // ---------- Header ----------
      ContainerTemplate
      .create('header')
      .contentStyle('tablerow')
      .children(
        ContainerTemplate
        .create('cell')
        .contentStyle('tablesortedheader')
        .children(
          TextItemTemplate.create('Name').nodes(StaticNodeTemplate.create('Name')),
          /* 'descending' itself cannot be tested, since this is done by the backend */
          ButtonTemplate.create().styles('sort', 'descending')
        )
      ),
      // ---------- Row #1 ----------
      ContainerTemplate
      .create('row')
      .contentStyle('tablerow')
      .children(
        FieldTemplate.text('Person.Name').value('Mike').readonly(true),
        ButtonTemplate.create('mybutton').caption('clickme')
      ),
      // ---------- Row #2 ----------
      ContainerTemplate
      .create('row')
      .contentStyle('tablerow')
      .children(
        FieldTemplate.text('Person.Name').value('Tilly').readonly(true),
        ButtonTemplate.create('mybutton').caption('clickme')
      )
      // ---------- End ----------
    );
    const btnFirst = ButtonTemplate.create('first')
    .caption('<<')
    .disabled(true)
    .styles('pagination');

    const btnPrevious = ButtonTemplate.create('previous')
    .caption('<')
    .disabled(true)
    .styles('pagination');

    const currentPageNumber = FieldTemplate.integer('InstanceListContainer_currentPageNumber')
    .domain({ 1: '1', 2: '2', 3: '3' })
    .styles('paginationNumber')
    .value('1');

    const btnNext = ButtonTemplate.create('next')
    .caption('>')
    .styles('pagination');

    const btnLast = ButtonTemplate.create('last')
    .caption('>>')
    .styles('pagination');

    const pagination = ContainerTemplate.create()
    .name('navigationContainer')
    .displayName('DisplayName')
    .styles('navigationContainer')
    .contentStyle('tablenavigation')
    .children(
      btnFirst,
      btnPrevious,
      currentPageNumber,
      btnNext,
      btnLast
    );
    const list = ContainerTemplate.create().children(tableTemplate, pagination);
    session = BlueriqSessionTemplate.create().build(list);
    component = session.get(ListComponent);
  });

  it('should have been created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a header displayed with the correct content', () => {
    const matRows = component.nativeElement.querySelectorAll('.mat-row');
    expect(matRows.length).toBe(2);
    expect(matRows[0].innerText.trim()).toBe('Mike\nCLICKME');
    expect(matRows[1].innerText.trim()).toBe('Tilly\nCLICKME');
  });

  it('should have a row with the correct content', () => {
    const matHeaderCell = component.nativeElement.querySelectorAll('.mat-header-cell');
    expect(matHeaderCell.length).toBe(2);

    const headerCellContent = matHeaderCell[0].querySelector('bq-textitem-static').innerText;
    expect(headerCellContent.trim()).toBe('Name');
  });

  it('should have a row with the correct content', () => {
    const readonlyCells = component.nativeElement.querySelectorAll('bq-readonly');
    expect(readonlyCells.length).toBe(2);
    expect(readonlyCells[0].querySelector('label')).toBeFalsy();
  });

  it('should have a mat-button in a tablecell', () => {
    const matButtons = component.nativeElement.querySelectorAll('.mat-button');
    expect(matButtons.length).toBe(2);
  });

  it('should not have a mat-raised-button in a tablecell', () => {
    const matRaisedButtons = component.nativeElement.querySelectorAll('.mat-raised-button');
    expect(matRaisedButtons.length).toBe(0);
  });
});
