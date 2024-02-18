import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PomodoroTimer } from '../../pomodoro';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.widget.html',
  styleUrls: ['./timer.widget.css']
})
export class TimerComponent {
  @Input() timer: PomodoroTimer = new PomodoroTimer(25, 5);
  @Input() id: number = 1;
  @Input() name: string = ' ';
  @Input() description: string = ' ';
  start: boolean = true;

  constructor() {}

  startOrResume() {
    if (this.start == true) {
      this.start = false;
      this.timer.start();
    } else {
      this.timer.resume();
    }
  }

  pause() {
    this.timer.pause();
  }

  formatCountdown(countdownValue: number | null): string {
    if (countdownValue === null) {
      return '00:00';
    }
    const minutes = Math.floor(countdownValue / 60);
    const seconds = countdownValue % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
