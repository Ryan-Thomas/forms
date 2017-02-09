import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {validateConfig} from '@angular/router/src/config';
import {Observable} from 'rxjs';
import any = jasmine.any;

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
        ['Cooking', Validators.required, this.asyncExampleValidator],
      ]),
    });

    this.myForm.statusChanges.subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }

  onAddHobby(): void {
    console.log('this.myForm.controls', this.myForm.controls);
    (<FormArray>this.myForm.controls['hobbies'])
      .push(new FormControl('', Validators.required, this.asyncExampleValidator));
  }

  onSubmit(form): void {
    console.log('form', form);
  }

  // If you resolve anything other than null, the validator will have failed.
  exampleValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Example') {
      return {example: true};
    }
    return null;
  }

  asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Example') {
            resolve({'invalid': true});
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );
    return promise;
  }
}
