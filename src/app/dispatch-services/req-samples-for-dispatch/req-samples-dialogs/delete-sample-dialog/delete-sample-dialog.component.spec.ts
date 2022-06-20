import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSampleDialogComponent } from './delete-sample-dialog.component';

describe('DeleteSampleDialogComponent', () => {
  let component: DeleteSampleDialogComponent;
  let fixture: ComponentFixture<DeleteSampleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSampleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
