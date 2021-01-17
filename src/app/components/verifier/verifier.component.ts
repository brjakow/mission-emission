import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-verifier',
  templateUrl: './verifier.component.html',
  styleUrls: ['./verifier.component.scss'],
})
export class VerifierComponent implements OnInit {
  displayedColumns: string[] = [
    'airlineID',
    'emissionCapacity',
    'emissionComsumption',
    'name',
  ];
  dataSource: any;
  id: string;
  selectedAirline: any;
  error: string;
  totalConsumption = 200;
  openConsumption = 0;
  verifierWarning: string;
  sellValue: any;
  clicked = false;
  warning: string;

  constructor(private http: HttpClient, private data: DataService) {}

  ngOnInit(): void {
    // this.http.get('http://172.18.60.73:3000/api/Airline/').subscribe((data) => {
    //   this.dataSource = data;
    // });
    this.totalConsumption = this.data.getAC();
  }

  // getAirlineById(id: string): any {
  //   this.verifierWarning = '';
  //   this.error = '';
  //   this.http.get('http://172.18.60.73:3000/api/Airline/' + id).subscribe(
  //     (data) => {
  //       this.selectedAirline = data;
  //       this.checkConsumption();
  //     },
  //     (err) => {
  //       this.error = 'Wählen Sie bitte eine valide Id!';
  //     }
  //   );
  // }

  postCertificate(value: number): void {
    if (value) {
      this.sellValue = null;
      this.data.removeAC(value);
      this.totalConsumption = this.data.getAC();
      this.clicked = true;
      this.postCertificateRest(value);
      this.warning = 'Es wurden ' + value + ' Zertifikate ausgeteilt.';
      this.data.addOC(value);
    }
  }

  postCertificateRest(value: number): void {
    const body = {
      $class: 'org.hackathon.BuyCertificateAtAuction',
      airline: 'resource:org.hackathon.Airline#' + 10,
      platform: 'resource:org.hackathon.AuctionPlatform#' + 20,
      certificate: 'resource:org.hackathon.Certificate#' + 201,
    };

    this.http
      .post('http://172.18.60.73:3000/api/BuyCertificateAtAuction/', body)
      .subscribe((data) => {
        console.log(data);
      });
  }

  checkConsumption(): void {
    if (this.openConsumption <= 0 && this.selectedAirline) {
      this.verifierWarning = 'Buy new Certificates';
    }
  }
}
