import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseColorDialogComponent } from './choose-color-dialog.component';

describe('ChooseColorDialogComponent', () => {
  let component: ChooseColorDialogComponent;
  let fixture: ComponentFixture<ChooseColorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseColorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
