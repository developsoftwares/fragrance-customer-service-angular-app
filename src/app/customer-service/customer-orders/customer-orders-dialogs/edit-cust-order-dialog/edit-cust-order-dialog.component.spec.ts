import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustOrderDialogComponent } from './edit-cust-order-dialog.component';

describe('EditCustOrderDialogComponent', () => {
  let component: EditCustOrderDialogComponent;
  let fixture: ComponentFixture<EditCustOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
