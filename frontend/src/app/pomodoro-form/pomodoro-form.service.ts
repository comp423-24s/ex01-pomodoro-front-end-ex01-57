import { Injectable } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { TimerComponent } from '../productivity/timer/timer.widget';

@Injectable({
  providedIn: 'root'
})
export class PomodoroFormService {
  private pomodoros: PomodoroTimer[] = [];
  private pomodoroNames: string[] = [];
  private pomodoroDecs: string[] = [];
  private pomodoroids: number[] = [];
  private nextId: number = 1;
  constructor() {}

  createPomodoro(
    name: string,
    description: string,
    workSessionLength: number,
    breakSessionLength: number
  ): PomodoroTimer | null {
    if (
      !name ||
      !description ||
      workSessionLength <= 0 ||
      breakSessionLength <= 0
    ) {
      console.error('Invalid input values');
      return null;
    }

    // Create new Pomodoro
    const newPomodoro = new PomodoroTimer(
      workSessionLength,
      breakSessionLength
    );
    this.pomodoros.push(newPomodoro);
    this.pomodoroNames.push(name);
    this.pomodoroDecs.push(description);
    this.pomodoroids.push(this.nextId);
    this.nextId += 1;

    return newPomodoro;
  }
}
