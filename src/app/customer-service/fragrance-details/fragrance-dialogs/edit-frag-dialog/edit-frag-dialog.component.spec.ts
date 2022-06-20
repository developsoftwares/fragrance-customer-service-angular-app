import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFragDialogComponent } from './edit-frag-dialog.component';

describe('EditFragDialogComponent', () => {
  let component: EditFragDialogComponent;
  let fixture: ComponentFixture<EditFragDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFragDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFragDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
