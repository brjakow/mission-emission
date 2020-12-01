import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigateService } from './services/navigate.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mission-emission';
  isLoggedIn = false;
  user: string;

  tradeCertificate = {
    $class: 'org.hackathon.TradeCertificate',
    airline: 'resource:org.hackathon.Airline#1',
    stock: 'resource:org.hackathon.Stock#3',
    volume: 150,
  };

  constructor(
    private http: HttpClient,
    private navigate: NavigateService,
    private mock: DataService
  ) {
    this.navigate.isLoggedIn.subscribe((data) => (this.isLoggedIn = data));
    this.navigate.user.subscribe((data) => {
      this.user = data;
      this.mock.setUser(this.user);
    });
  }

  logout(): void {
    this.navigate.logout();
  }
}
