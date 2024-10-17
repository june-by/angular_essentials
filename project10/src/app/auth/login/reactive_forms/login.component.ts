import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl<string>) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

// async function emailIsUnique(control: AbstractControl<string>) {
//   return setTimeout(() => {
//     if (control.value !== 'test@test.com') {
//       return of(null);
//     }
//     return of({ notUnique: true });
//   }, 2000);
// }

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      //서버와 통신하거나 할 때 사용 observable
      // asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  ngOnInit(): void {
    const savedForm = window.localStorage.getItem('saved-login-form');

    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);

      this.form.patchValue({ email: loadedForm.email });
    }

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: value.email })
          );
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get isEmailInValid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get isPasswordInValid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  get isPasswordDoesNotContainQuestionMark() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.errors?.['doesNotContainQuestionMark']
    );
  }

  onSubmit() {
    // this.form.value.
    console.log(this.form);
    const { email: enteredEmail, password: enteredPassword } = this.form.value;
  }
}
