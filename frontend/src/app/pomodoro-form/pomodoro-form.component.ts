import { Component, Input, OnInit } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PomodoroFormService } from './pomodoro-form.service';
import { TimerComponent } from '../productivity/timer/timer.widget';

@Component({
  selector: 'app-pomodoro-form',
  templateUrl: './pomodoro-form.component.html',
  styleUrls: ['./pomodoro-form.component.css']
})
export class PomodoroFormComponent {
  @Input() timerDetails?: TimerComponent;
  pomodoroForm: FormGroup;
  timerCreated: boolean = false;
  showError: boolean = false;
  timerEdited: boolean = false;

  constructor(
    private creation: PomodoroFormService,
    private formBuilder: FormBuilder
  ) {
    this.pomodoroForm = this.formBuilder.group({
      pomodoroName: [this.timerDetails?.name || '', Validators.required],
      pomodoroDescription: [
        this.timerDetails?.description || '',
        Validators.required
      ],
      workSessionLength: [
        this.timerDetails?.timer.timerLength || 25,
        [Validators.required, Validators.min(1)]
      ],
      breakSessionLength: [
        this.timerDetails?.timer.breakLength || 5,
        [Validators.required, Validators.min(1)]
      ]
    });
  }

  onSubmit() {
    // Extract form values
    const formValues = this.pomodoroForm.value;

    if (this.pomodoroForm.valid) {
      if (this.creation.getEditStatus()) {
        this.creation.editTimer(
          formValues.pomodoroName,
          formValues.pomodoroDescription,
          formValues.workSessionLength,
          formValues.breakSessionLength
        );
        this.timerCreated = false;
        this.showError = false;
        this.timerEdited = true;
        console.log('Success! Pomodoro updated:', this.timerDetails);
      } else {
        const pom = this.creation.createTimer(
          formValues.pomodoroName,
          formValues.pomodoroDescription,
          formValues.workSessionLength,
          formValues.breakSessionLength
        );
        this.timerCreated = true;
        this.showError = false;
        this.timerEdited = false;
        console.log('Success! Pomodoro created:', pom);
      }
    } else {
      this.showError = true;
      this.timerCreated = false;
      this.timerEdited = false;
      console.log('Error! Form is not valid.');
    }
  }
}
