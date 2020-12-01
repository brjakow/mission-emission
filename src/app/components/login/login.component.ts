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
        case 'emirates':
          this.navigation.navigateTo('airline');
          this.navigation.setUser('Emirates');
          break;
        case 'ca':
          this.navigation.navigateTo('ca');
          this.navigation.setUser('EU');
          break;
        case 'verifier':
          this.navigation.navigateTo('verifier');
          this.navigation.setUser('EEX');
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
