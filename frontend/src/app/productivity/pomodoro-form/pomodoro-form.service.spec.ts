import { TestBed } from '@angular/core/testing';

import { PomodoroFormService } from './pomodoro-form.service';

describe('PomodoroFormService', () => {
  let service: PomodoroFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PomodoroFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
