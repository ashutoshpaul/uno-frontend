import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersLeftDialogComponent } from './players-left-dialog.component';

describe('PlayersLeftDialogComponent', () => {
  let component: PlayersLeftDialogComponent;
  let fixture: ComponentFixture<PlayersLeftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersLeftDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersLeftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
