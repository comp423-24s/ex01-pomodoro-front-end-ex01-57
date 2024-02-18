import { Component, OnInit } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';

@Component({
  selector: 'app-productivity',
  templateUrl: './productivity.component.html',
  styleUrls: ['./productivity.component.css']
})
export class ProductivityComponent implements OnInit {
  timers: PomodoroTimer[] = []; // Populate this with timers

  constructor() {}

  ngOnInit() {
    // Initialize timers here or fetch them from a service
  }
}
