import { Component, OnInit } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { PomodoroFormService } from './pomodoro-form/pomodoro-form.service';
import { TimerComponent } from './timer/timer.widget';
import { Router } from '@angular/router';
import { ProductivityService } from './productivity.service';

@Component({
  selector: 'app-productivity',
  templateUrl: './productivity.component.html',
  styleUrls: ['./productivity.component.css']
})
export class ProductivityComponent implements OnInit {
  timers: TimerComponent[] = [];

  constructor(
    private productivityService: ProductivityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.timers = this.productivityService.getTimers();
  }

  onCreatePomodoroClicked(): void {
    const id = this.productivityService.getNextID();
    this.router.navigate(['/productivity/edit/', id]);
  }

  edit(id: number): void {
    this.productivityService.edit(id);
  }

  delete(id: number): void {
    this.productivityService.delete(id);
  }
}
