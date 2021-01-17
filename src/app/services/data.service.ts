import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: any;
  user: string;
  openConsumption = 0;
  totalConsumption = 0;
  auctionC = 0;
  totalCert = 0;

  constructor(private httpClient: HttpClient) {}

  getTotalCert(): number {
    return this.totalCert;
  }

  addOC(con: number): void {
    this.totalCert += con;
    this.openConsumption += con;
  }

  addTC(con: number): void {
    this.totalConsumption += con;
  }

  addAC(con: number): void {
    this.auctionC += con;
  }

  removeOC(con: number): void {
    this.openConsumption -= con;
  }
  removeTotalCert(con: number): void {
    this.totalCert -= con;
  }

  removeTC(con: number): void {
    this.totalConsumption -= con;
  }

  removeAC(con: number): void {
    this.auctionC -= con;
  }

  getOC(): number {
    return this.openConsumption;
  }

  getTC(): number {
    return this.totalConsumption;
  }

  getAC(): number {
    return this.auctionC;
  }

  setUser(name: string): void {
    this.user = name;
  }

  getUser(): string {
    return this.user;
  }

  // getData(): any {
  //   this.httpClient.get('assets/data.json').subscribe((data) => {
  //     return data;
  //   });
  // }
}
