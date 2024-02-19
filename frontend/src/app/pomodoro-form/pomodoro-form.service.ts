import { Injectable } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { TimerComponent } from '../productivity/timer/timer.widget';
import { timer } from 'rxjs';
import { ICON_REGISTRY_PROVIDER } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class PomodoroFormService {
  private timers: TimerComponent[] = [];
  private nextId: number = 1;
  private editStatus: boolean = false;
  private ID: number = 0;

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
    timer.timer = new PomodoroTimer(
      workSessionLength * 60,
      breakSessionLength * 60
    );
    this.timers.push(timer);
    return timer;
  }

  getTimers(): TimerComponent[] {
    return this.timers;
  }

  getNextID(): number {
    return this.nextId;
  }

  edit(id: number): void {
    this.editStatus = true;
    this.ID = id - 1;
  }

  getEditStatus(): boolean {
    return this.editStatus;
  }

  editTimer(
    name: string,
    description: string,
    workTime: number,
    breakTime: number
  ): void {
    this.timers[this.ID].name = name;
    this.timers[this.ID].description = description;
    this.timers[this.ID].timer.breakLength = breakTime;
    this.timers[this.ID].timer.timerLength = workTime;
    this.timers[this.ID].timer.reset();
  }
}
