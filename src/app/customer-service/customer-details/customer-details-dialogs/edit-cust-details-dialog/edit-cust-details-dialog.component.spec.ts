import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustDetailsDialogComponent } from './edit-cust-details-dialog.component';

describe('EditCustDetailsDialogComponent', () => {
  let component: EditCustDetailsDialogComponent;
  let fixture: ComponentFixture<EditCustDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
