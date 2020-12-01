import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: any;
  user: string;

  constructor(private httpClient: HttpClient) {}

  setUser(name: string): void {
    this.user = name;
  }

  getUser(): string {
    return this.user;
  }

  getData(): any {
    this.httpClient.get('assets/data.json').subscribe((data) => {
      return data;
    });
  }
}
