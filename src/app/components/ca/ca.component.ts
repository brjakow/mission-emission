import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ca',
  templateUrl: './ca.component.html',
  styleUrls: ['./ca.component.scss'],
})
export class CaComponent implements OnInit {
  id: string;
  sellValue: number;
  warning: string;
  airline: string;
  clicked = false;
  value: number;
  totalCert: number;

  constructor(private http: HttpClient, private data: DataService) {}

  ngOnInit(): void {
    this.totalCert = this.data.getTotalCert();
  }

  update(): void {
    this.warning = '';
    this.clicked = false;
    return;
  }

  giftC(value: number): void {
    if (value) {
      this.sellValue = null;
      this.clicked = true;
      this.giftCRest(value);
      this.warning = 'Es wurden ' + value + ' Zertifikate vergeben.';
      this.data.addOC(value);
    }
  }

  sellC(value: number): void {
    if (value) {
      this.value = null;
      this.clicked = true;
      this.sellCRest(value);
      this.warning = 'Es wurden ' + value + ' Zertifikate vergeben.';
      this.data.addAC(value);
    }
  }

  giftCRest(value: number): void {
    const body = {
      $class: 'org.hackathon.GiveCertificates4Free',
      competentAuthority: 'resource:org.hackathon.CompetentAuthority#1',
      airline: 'resource:org.hackathon.Airline#' + 10,
      volume: value,
    };

    this.http
      .post('http://172.18.60.73:3000/api/GiveCertificates4Free/', body)
      .subscribe((data) => {
        console.log(data);
      });
  }

  sellCRest(value: number): void {
    const body = {
      $class: 'org.hackathon.GiveCertificates4Auctioning',
      competentAuthority: 'resource:org.hackathon.CompetentAuthority#1',
      platform: 'resource:org.hackathon.AuctionPlatform#' + 20,
      volume: value,
    };

    this.http
      .post('http://172.18.60.73:3000/api/GiveCertificates4Auctioning/', body)
      .subscribe((data) => {
        console.log(data);
      });
  }

  postCertificate(): void {
    if (this.id === 'Emirates') {
      this.post('20');
    } else if (this.id === 'Lufthansa') {
      this.post('10');
    } else {
      this.warning =
        'Bitte geben Sie eine existierende Fluggesellschaft ein oder überprüfen Sie die Rechtschreibung!';
    }
  }

  post(id: string): void {
    const body = {
      $class: 'org.hackathon.CreateCertificate',
      airline: 'resource:org.hackathon.Airline#' + id,
      competentAuthority: 'resource:org.hackathon.CompetentAuthority#4',
      volume: this.sellValue,
    };

    this.http
      .post('http://172.18.60.73:3000/api/CreateCertificate/', body)
      .subscribe((data) => {
        console.log(data);
      });
  }

  approve(): void {
    const body = {
      $class: 'org.hackathon.Surrender',
      ca: 'resource:org.hackathon.CompetentAuthority#4',
    };

    this.http
      .post('http://172.18.60.73:3000/api/Surrender/', body)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
