import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {validateConfig} from '@angular/router/src/config';

@Component({
  moduleId: module.id,
  selector: 'app-data-driven',
  templateUrl: 'data-driven.component.html'
})
export class DataDrivenComponent {
  myForm: FormGroup;

  genders = [
    'male',
    'female',
  ];

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    //noinspection TsLint
    this.myForm = fb.group({
      'userData': fb.group({
        'username': ['Max', [Validators.required, this.exampleValidator]],
        // 'username': new FormControl('Max', Validators.required),
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          )]],
      }),
      'password': ['', Validators.required],
      'gender': ['male'],
      'hobbies': fb.array([
        ['Cooking', Validators.required],
      ]),
    });
  }

  onAddHobby(): void {
    console.log('this.myForm.controls', this.myForm.controls);
    (<FormArray>this.myForm.controls['hobbies']).push(new FormControl('', Validators.required));
  }

  onSubmit(form): void {
    console.log('form', form);
  }

  exampleValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Example') {
      return {example: true};
    }
    return null;
  }
}
