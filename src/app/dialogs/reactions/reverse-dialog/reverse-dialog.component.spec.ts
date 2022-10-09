import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseDialogComponent } from './reverse-dialog.component';

describe('ReverseDialogComponent', () => {
  let component: ReverseDialogComponent;
  let fixture: ComponentFixture<ReverseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReverseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
