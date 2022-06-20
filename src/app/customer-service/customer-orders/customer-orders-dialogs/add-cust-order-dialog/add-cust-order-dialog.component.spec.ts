import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustOrderDialogComponent } from './add-cust-order-dialog.component';

describe('AddCustOrderDialogComponent', () => {
  let component: AddCustOrderDialogComponent;
  let fixture: ComponentFixture<AddCustOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
