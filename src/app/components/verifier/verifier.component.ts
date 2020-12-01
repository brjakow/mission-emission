import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { HttpClient } from '@angular/common/http';

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
  totalConsumption = 0;
  openConsumption = 0;
  verifierWarning: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://172.18.60.73:3000/api/Airline/').subscribe((data) => {
      this.dataSource = data;
    });
  }

  getAirlineById(id: string): any {
    this.verifierWarning = '';
    this.error = '';
    this.http.get('http://172.18.60.73:3000/api/Airline/' + id).subscribe(
      (data) => {
        this.selectedAirline = data;
        this.checkConsumption();
      },
      (err) => {
        this.error = 'Wählen Sie bitte eine valide Id!';
      }
    );
  }

  checkConsumption(): void {
    if (this.openConsumption <= 0 && this.selectedAirline) {
      this.verifierWarning = 'Buy new Certificates';
    }
  }
}
