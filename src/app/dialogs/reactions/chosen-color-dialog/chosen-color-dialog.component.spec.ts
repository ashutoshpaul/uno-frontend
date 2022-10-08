import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenColorDialogComponent } from './chosen-color-dialog.component';

describe('ChosenColorDialogComponent', () => {
  let component: ChosenColorDialogComponent;
  let fixture: ComponentFixture<ChosenColorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenColorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
