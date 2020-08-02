import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stocks-dashboard',
  templateUrl: './stocks-dashboard.component.html',
  styleUrls: ['./stocks-dashboard.component.css']
})
export class StocksDashboardComponent implements OnInit {

  stockCodes: string[] = [];

  constructor() { }

  ngOnInit(): void { }

  addStock(code: string) {
    this.stockCodes.unshift(code.toUpperCase());
  }

  removeStock(code: string) {
    this.stockCodes = this.stockCodes.filter(stockCode => stockCode != code);
  }
}
