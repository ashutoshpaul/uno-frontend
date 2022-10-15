import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnoBoardComponent } from './uno-board.component';

describe('UnoBoardComponent', () => {
  let component: UnoBoardComponent;
  let fixture: ComponentFixture<UnoBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnoBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
