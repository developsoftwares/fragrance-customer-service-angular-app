import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustOrdersDialogComponent } from './delete-cust-orders-dialog.component';

describe('DeleteCustOrdersDialogComponent', () => {
  let component: DeleteCustOrdersDialogComponent;
  let fixture: ComponentFixture<DeleteCustOrdersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCustOrdersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCustOrdersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
