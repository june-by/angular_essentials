import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const password = control.get(controlName1)?.value;
    const confirmPassword = control.get(controlName2)?.value;

    return password === confirmPassword ? null : { passwordsNotEqual: true };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        'confirm-password': new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [equalValues('password', 'confirm-password')],
      }
    ),
    'first-name': new FormControl('', {
      validators: [Validators.required],
    }),
    'last-name': new FormControl('', {
      validators: [Validators.required],
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.required],
      }),
      'postal-code': new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: [Validators.required],
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, {
      validators: [Validators.required],
    }),
  });

  isFormValueInValid(key: keyof typeof this.form.controls) {
    return (
      this.form.controls[key].touched &&
      this.form.controls[key].dirty &&
      this.form.controls[key].invalid
    );
  }

  get isEmailInvalid() {
    return this.isFormValueInValid('email');
  }

  get isPasswordInvalid() {
    return false;
  }

  get isConfirmPasswordInvalid() {
    return false;
  }

  get isFirstnameInvalid() {
    return this.isFormValueInValid('first-name');
  }

  get isLastnameInvalid() {
    return this.isFormValueInValid('last-name');
  }

  onReset() {
    this.form.reset();
  }

  markAllAsDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsDirty(); // 각 FormControl을 dirty 상태로 만듭니다.
      } else if (control instanceof FormGroup) {
        this.markAllAsDirty(control); // FormGroup 안에 또 다른 FormGroup이 있을 경우 재귀 호출
      }
    });
  }

  onSubmit() {
    console.log('Form Submitted', this.form.controls);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.markAllAsDirty(this.form);
      return;
    }

    console.log('Form Submitted', this.form.value);
  }
}
