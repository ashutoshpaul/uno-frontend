import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflinePlayerDialogComponent } from './offline-player-dialog.component';

describe('OfflinePlayerDialogComponent', () => {
  let component: OfflinePlayerDialogComponent;
  let fixture: ComponentFixture<OfflinePlayerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflinePlayerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflinePlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
