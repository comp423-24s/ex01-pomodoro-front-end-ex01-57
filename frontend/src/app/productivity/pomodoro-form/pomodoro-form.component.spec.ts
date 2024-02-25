import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroFormComponent } from './pomodoro-form.component';

describe('PomodoroFormComponent', () => {
  let component: PomodoroFormComponent;
  let fixture: ComponentFixture<PomodoroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PomodoroFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PomodoroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
