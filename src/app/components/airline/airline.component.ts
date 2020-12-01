import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.scss'],
})
export class AirlineComponent implements OnInit {
  airline: any;
  id: string;
  mockData: any;
  user: string;
  buyValue: number;
  sellValue: number;
  warning: string;
  con: any;
  totalConsumption = 0;
  openConsumption = 0;
  lastUpdate = '1. November 2020';

  constructor(private http: HttpClient, private data: DataService) {}

  ngOnInit(): void {
    this.user = this.data.getUser();
    if (this.user === 'Emirates') {
      this.id = '20';
    } else {
      this.id = '10';
    }
    this.getNewConsumption(this.id);
  }

  update(): void {
    if (this.user === 'Emirates') {
      this.getNewConsumption(this.id);
    } else {
      this.getNewConsumption(this.id);
    }
  }

  newConsumption(): void {
    if (this.user === 'Emirates') {
      this.postNewConsumption(this.id);
    } else {
      this.postNewConsumption(this.id);
    }
    this.lastUpdate = '1. Dezember 2020';
    if (this.openConsumption <= 0) {
      this.warning =
        'Ihre Emissionszertifikate sind aufgebraucht! Bitte erwerben Sie neue Zertifikate.';
    }
  }

  postNewConsumption(id: string): any {
    const body = {
      $class: 'org.hackathon.Consume',
      airline: 'resource:org.hackathon.Airline#' + id,
      volume: 50,
    };

    this.http
      .post('http://172.18.60.73:3000/api/Consume/', body)
      .subscribe((data) => {
        this.con = 0;
        this.con = data;
        console.log(this.con);
        this.totalConsumption += this.con;
        this.openConsumption -= this.totalConsumption;
      });
  }

  getNewConsumption(id: string): any {
    this.http
      .get('http://172.18.60.73:3000/api/Airline/' + id)
      .subscribe((data) => {
        this.airline = data;
        console.log(data);
        this.totalConsumption = this.airline.emissionConsumption;
        this.openConsumption =
          this.airline.emissionCapacity - this.airline.emissionConsumption;
      });
  }

  buyCertificate(value: number): void {
    const body = {
      $class: 'org.hackathon.BuyCertificates',
      airline: 'resource:org.hackathon.Airline#' + this.id,
      stock: 'resource:org.hackathon.Stock#3',
      volume: value,
    };

    this.http
      .post('http://172.18.60.73:3000/api/BuyCertificates/', body)
      .subscribe((data) => {
        console.log(data);
      });
  }

  sellCertificate(value: number): void {
    const body = {
      $class: 'org.hackathon.CellCertificates',
      airline: 'resource:org.hackathon.Airline#' + this.id,
      stock: 'resource:org.hackathon.Stock#3',
      volume: value,
    };

    this.http
      .post('http://172.18.60.73:3000/api/CellCertificates/', body)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
