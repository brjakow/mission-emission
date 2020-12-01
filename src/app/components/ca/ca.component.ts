import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

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
