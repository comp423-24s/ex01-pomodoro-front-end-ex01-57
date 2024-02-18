import { Component, OnInit } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PomodoroFormService } from './pomodoro-form.service';

@Component({
  selector: 'app-pomodoro-form',
  templateUrl: './pomodoro-form.component.html',
  styleUrls: ['./pomodoro-form.component.css']
})
export class PomodoroFormComponent {
  pomodoroForm: FormGroup;
  timerCreated: boolean = false;
  showError: boolean = false;

  constructor(
    private creation: PomodoroFormService,
    private formBuilder: FormBuilder
  ) {
    this.pomodoroForm = this.formBuilder.group({
      pomodoroName: ['', Validators.required],
      pomodoroDescription: ['', Validators.required],
      workSessionLength: [25, [Validators.required, Validators.min(1)]],
      breakSessionLength: [5, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    // Extract form values
    const formValues = this.pomodoroForm.value;

    // Check if the form is valid
    if (this.pomodoroForm.valid) {
      const pom = this.creation.createTimer(
        formValues.pomodoroName,
        formValues.pomodoroDescription,
        formValues.workSessionLength,
        formValues.breakSessionLength
      );
      console.log('Success! Pomodoro created:', pom);
    } else {
      console.log('Error! Form is not valid.');
    }
  }
}
