import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavigateService } from 'src/app/services/navigate.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error: string | null;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public navigation: NavigateService) {}

  submit(): void {
    this.error = null;

    if (this.form.value.username === this.form.value.password) {
      switch (this.form.value.username) {
        case 'lufthansa':
          this.navigation.navigateTo('airline');
          this.navigation.setUser('Lufthansa');
          break;
        case 'eex':
          this.navigation.navigateTo('eex');
          this.navigation.setUser('EEX');
          break;
        case 'dehst':
          this.navigation.navigateTo('dehst');
          this.navigation.setUser('Deutsche Emissionshandelsstelle');
          break;
        default:
          this.setError();
      }
    } else {
      this.setError();
    }
  }

  setError(): void {
    this.error = 'Benutzer oder Passwort sind falsch!';
  }
}
