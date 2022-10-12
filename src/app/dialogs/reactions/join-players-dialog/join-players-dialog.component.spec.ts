import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPlayersDialogComponent } from './join-players-dialog.component';

describe('JoinPlayersDialogComponent', () => {
  let component: JoinPlayersDialogComponent;
  let fixture: ComponentFixture<JoinPlayersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinPlayersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinPlayersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
