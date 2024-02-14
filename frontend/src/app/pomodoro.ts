import { Observable, ReplaySubject, Subscription, interval } from 'rxjs';

export class PomodoroTimer {
  previousState: PomodoroTimerState;
  state: PomodoroTimerState;
  timerLength: number;
  breakLength: number;

  timerId: number = 0;

  private countdownValue: number = 0;
  private countdown: ReplaySubject<number> = new ReplaySubject(1);
  countdown$: Observable<number> = this.countdown.asObservable();

  private timer: Observable<number> = interval(1000);
  private timerSubscription: Subscription | null = null;

  constructor(timerLength: number, breakLength: number) {
    this.timerLength = timerLength;
    this.breakLength = breakLength;
    this.previousState = PomodoroTimerState.IDLE;
    this.state = PomodoroTimerState.IDLE;
  }

  start() {
    this.reset();
    this.state = PomodoroTimerState.WORKING;
    this.startCountdown();
  }

  reset() {
    this.timerSubscription?.unsubscribe();
    this.updateCountdown(this.timerLength);
    this.previousState = PomodoroTimerState.IDLE;
    this.state = PomodoroTimerState.IDLE;
  }

  resume() {
    if (this.state == PomodoroTimerState.IDLE) {
      this.state = this.previousState;
      this.previousState = PomodoroTimerState.IDLE;
      this.startCountdown();
    } else {
      console.log('Cannot resume a timer that is not currently idle.');
    }
  }

  pause() {
    if (this.state != PomodoroTimerState.IDLE) {
      this.timerSubscription?.unsubscribe();
      this.previousState = this.state;
      this.state = PomodoroTimerState.IDLE;
    } else {
      console.log('Cannot pause a timer that is currently idle.');
    }
  }

  private updateCountdown(value: number) {
    this.countdownValue = value;
    this.countdown.next(value);
  }

  private startCountdown() {
    this.timerSubscription = this.timer.subscribe(() => {
      if (this.countdownValue == 0) {
        if (this.state == PomodoroTimerState.WORKING) {
          this.state = PomodoroTimerState.BREAK;
          this.updateCountdown(this.breakLength);
        } else {
          this.state = PomodoroTimerState.WORKING;
          this.updateCountdown(this.timerLength);
        }
      } else {
        this.updateCountdown(this.countdownValue - 1);
      }
    });
  }
}

enum PomodoroTimerState {
  IDLE,
  WORKING,
  BREAK
}
