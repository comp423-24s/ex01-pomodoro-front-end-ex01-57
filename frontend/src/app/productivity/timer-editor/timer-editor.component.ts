/**
 * The Timer Editor component allows pomodoro timers to be both
 * created and edited.
 *
 * @author Ajay Gandecha
 * @copyright 2024
 * @license MIT
 */

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductivityService } from '../productivity.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimerResponse } from '../timerdata';

@Component({
  selector: 'app-timer-editor',
  templateUrl: './timer-editor.component.html',
  styleUrls: ['./timer-editor.component.css']
})
export class TimerEditorComponent {
  public static Route = {
    path: 'productivity/edit/:pomo_id',
    title: 'Timer Editor',
    component: TimerEditorComponent
  };

  /** Form controls (individual form items) */
  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  timerLength = new FormControl(0, [Validators.required]);
  breakLength = new FormControl(0, [Validators.required]);

  /** Form group (stores all form controls) */
  public timerForm = this.formBuilder.group({
    name: this.name,
    description: this.description,
    timerLength: this.timerLength,
    breakLength: this.breakLength
  });

  /** Stores the ID of the timer currently being edited. */
  id: number = -1;

  /** Stores whether or not the timer is new. */
  isNew: boolean = false;

  constructor(
    private productivityService: ProductivityService,
    private route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    private router: Router,
    protected snackBar: MatSnackBar
  ) {
    // Determine if the timer is new.
    this.isNew = route.snapshot.params['pomo_id'] == 'new';

    // If the timer is not new, set existing timer data and update the forms.
    if (!this.isNew) {
      this.id = route.snapshot.params['pomo_id'];
      productivityService.getTimer(this.id).subscribe((timerData) => {
        this.timerForm.setValue({
          name: timerData.name,
          description: timerData.description,
          timerLength: timerData.timer.timerLength,
          breakLength: timerData.timer.breakLength
        });
      });
    }
  }

  /** Function that runs when the form is submitted. */
  public onSubmitForm() {
    // First, ensure that the form is valid (all validators pass). Otherwise, display a snackbar error.
    if (this.timerForm.valid) {
      let timer: TimerResponse = {
        id: this.id,
        // @ts-ignore: Object is possibly 'null'.
        name: this.timerForm.get('name').value!,
        // @ts-ignore: Object is possibly 'null'.
        description: this.timerForm.get('description').value!,
        // @ts-ignore: Object is possibly 'null'.
        timer_length: this.timerForm.get('timerLength').value!,
        // @ts-ignore: Object is possibly 'null'.
        break_length: this.timerForm.get('breakLength').value!
      };
      Object.assign(timer, this.timerForm.value);
      // If the timer is new, create it.
      if (this.isNew) {
        this.productivityService.createTimer(timer);
        // TODO: Create a timer.
      } else {
        this.productivityService.editTimer(timer);
        // TODO: Edit the existing timer.
      }
    } else {
      this.snackBar.open('Please enter values in the form correctly.', '', {
        duration: 2000
      });
    }
  }
}
