import { Component, OnInit } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { PomodoroFormService } from '../pomodoro-form/pomodoro-form.service';
import { TimerComponent } from './timer/timer.widget';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productivity',
  templateUrl: './productivity.component.html',
  styleUrls: ['./productivity.component.css']
})
export class ProductivityComponent implements OnInit {
  timers: TimerComponent[] = [];

  constructor(
    private pomodoroFormService: PomodoroFormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.timers = this.pomodoroFormService.getTimers();
  }

  onCreatePomodoroClicked(): void {
    const id = this.pomodoroFormService.getNextID();
    this.router.navigate(['/productivity/edit/', id]);
  }

  edit(id: number): void {
    this.pomodoroFormService.edit(id);
  }
}
