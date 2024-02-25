import { Injectable } from '@angular/core';
import { PomodoroTimer } from '../../pomodoro';
import { TimerComponent } from '../timer/timer.widget';
import { timer } from 'rxjs';
import { ICON_REGISTRY_PROVIDER } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class PomodoroFormService {}
