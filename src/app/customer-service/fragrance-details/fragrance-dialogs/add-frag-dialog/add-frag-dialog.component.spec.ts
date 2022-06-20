import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFragDialogComponent } from './add-frag-dialog.component';

describe('AddFragDialogComponent', () => {
  let component: AddFragDialogComponent;
  let fixture: ComponentFixture<AddFragDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFragDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFragDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
