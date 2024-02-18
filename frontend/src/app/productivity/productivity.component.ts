import { Component, OnInit } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { PomodoroFormService } from '../pomodoro-form/pomodoro-form.service';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-productivity',
  templateUrl: './productivity.component.html',
  styleUrls: ['./productivity.component.css']
})
export class ProductivityComponent implements OnInit {
  timers: TimerComponent[] = [];

  constructor(private pomodoroFormService: PomodoroFormService) {}

  ngOnInit(): void {
    this.timers = this.pomodoroFormService.getTimers();
  }
}
