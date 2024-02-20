import { Injectable } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { TimerComponent } from '../productivity/timer/timer.widget';

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
    this.ID = id;
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
    for (let timer of this.timers) {
      let i: number = 0;
      if (timer.id == this.ID) {
        this.timers[i].name = name;
        this.timers[i].description = description;
        this.timers[i].timer = new PomodoroTimer(workTime * 60, breakTime * 60);
        break;
      }
      i++;
    }
  }

  delete(id: number): void {
    for (let timer of this.timers) {
      let i: number = 0;
      if (timer.id == id) {
        this.timers.splice(i, 1);
        break;
      }
      i++;
    }
  }
}
