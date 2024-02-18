import { Injectable } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { TimerComponent } from '../productivity/timer/timer.component';

@Injectable({
  providedIn: 'root'
})
export class PomodoroFormService {
  private timers: TimerComponent[] = [];
  private nextId: number = 1;

  createTimer(
    name: string,
    description: string,
    workSessionLength: number,
    breakSessionLength: number
  ): TimerComponent {
    const timer = new TimerComponent();
    timer.id = this.nextId++;
    timer.name = name;
    timer.description = description;
    timer.timer = new PomodoroTimer(workSessionLength, breakSessionLength);
    this.timers.push(timer);
    return timer;
  }

  getTimers(): TimerComponent[] {
    return this.timers;
  }
}
