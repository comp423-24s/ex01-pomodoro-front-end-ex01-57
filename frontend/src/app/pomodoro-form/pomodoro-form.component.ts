import { Component } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { PomodoroFormService } from './pomodoro-form.service';

@Component({
  selector: 'app-pomodoro-form',
  templateUrl: './pomodoro-form.component.html',
  styleUrls: ['./pomodoro-form.component.css']
})
export class PomodoroFormComponent {
  pomodoroName: string = '';
  pomodoroDescription: string = '';
  workSessionLength: number = 25;
  breakSessionLength: number = 5;
  timerID: number = 1;
  creation: PomodoroFormService = PomodoroFormService.constructor();

  onSubmit() {
    const pom = this.creation.createPomodoro(
      this.pomodoroName,
      this.pomodoroDescription,
      this.workSessionLength,
      this.breakSessionLength
    );

    return pom;
  }
}
