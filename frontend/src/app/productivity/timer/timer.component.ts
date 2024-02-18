import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PomodoroTimer } from '../../pomodoro';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  @Input() timer: PomodoroTimer = new PomodoroTimer(25, 5);
  @Input() id: number = 1;
  @Input() name: string = ' ';
  @Input() description: string = ' ';

  constructor() {}
}
