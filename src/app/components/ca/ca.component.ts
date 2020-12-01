import { Component, OnInit } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ca',
  templateUrl: './ca.component.html',
  styleUrls: ['./ca.component.scss'],
})
export class CaComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
