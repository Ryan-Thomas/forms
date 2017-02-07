import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-template-driven',
  templateUrl: 'template-driven.component.html',
  styles: [`
    .ng-invalid {
      border: 1px solid red;
    }
  `]
})
export class TemplateDrivenComponent {

  onSubmit(form: NgForm) {
    console.log('form', form);
  }
}
