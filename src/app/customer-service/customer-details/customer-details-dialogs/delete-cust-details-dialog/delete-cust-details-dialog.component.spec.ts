import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustDetailsDialogComponent } from './delete-cust-details-dialog.component';

describe('DeleteCustDetailsDialogComponent', () => {
  let component: DeleteCustDetailsDialogComponent;
  let fixture: ComponentFixture<DeleteCustDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCustDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCustDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
