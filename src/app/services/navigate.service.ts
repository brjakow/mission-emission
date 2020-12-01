import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  isLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);
  user: Subject<string> = new BehaviorSubject<string>('');

  constructor(public router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isLoggedIn.next(true);
    this.user.next(route);
  }

  setUser(user: string): void {
    this.user.next(user);
  }

  logout(): void {
    this.router.navigate(['login']);
    this.isLoggedIn.next(false);
    this.user.next('');
  }
}
