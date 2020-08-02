import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js';
import {StockPrice} from '../../models/StockPrice.model';
import { StockPriceService } from '../../services/stock-price.service'
import * as dayjs from 'dayjs'
import { ThrowStmt } from '@angular/compiler';
import { MatEndDate } from '@angular/material/datepicker';

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent implements OnInit {
  stockPrices: StockPrice[];
  name: string = '';
  showGraph: boolean = false;
  startDate: Date = null;
  endDate: Date = null;
  chart: Chart = null;
  @Input() code: string;
  @Output() onRemove: EventEmitter<any> = new EventEmitter();

  constructor(private stockService:StockPriceService) { }

  ngOnInit(): void {
    this.fetchDataAndRenderGraph();
  }

  dateChange(event: any): void {
    // make sure to only trigger the re-render after the start and end date is modified, since the end date
    // is always set after the start date, we only run the code if the changed element is the end date
    if (event.target instanceof MatEndDate && this.chart !== null && this.startDate && this.endDate) {
      this.showGraph = false;
      this.fetchDataAndRenderGraph();
    }
  }

  remove(): void {
    this.onRemove.emit(this.code);
  }

  fetchDataAndRenderGraph() {
    if (!this.endDate) {
      this.endDate = new Date();
    }
    const end = dayjs(this.endDate);
    if (!this.startDate) {
      this.startDate = end.subtract(1, 'month').toDate();
    }
    const start = dayjs(this.startDate);

    const daysDifference: number = Math.floor(end.diff(start) / (1000 * 60 * 60 * 24));
    const step:number = daysDifference / 20 > 1 ? Math.floor(daysDifference / 20) : 1; // get at most 15 data points

    this.stockService.getStockPriceByDateRange(this.code, end, start, step, 'day')
      .subscribe(stockPrices => {
        this.stockPrices = stockPrices.filter(stockPrice => stockPrice !== null);
        if (this.stockPrices.length > 0) {
          this.name = this.stockPrices[0].stock[0].name;
        }
        this.showGraph = true;
        setTimeout(() => {
          this.renderGraph();
        }, 1);
      });
  }

  renderGraph() {
    this.chart = new Chart(`chart-canvas-${this.code}`, {
      type: 'line',
      maintainAspectRatio: false,
      responsive: true,
      data: {
        labels: this.stockPrices.map(stockPrice => dayjs(stockPrice.as_of).format('MM-DD-YYYY')),
        datasets: [{
          label: 'Price',
          borderColor: 'blue',
          backgroundColor: 'blue',
          fill: false,
          data: this.stockPrices.map(stockPrice => stockPrice.stock[0].price.amount)
        }, {
          label: 'Volume',
          borderColor: 'red',
          backgroundColor: 'red',
          fill: false,
          data: this.stockPrices.map(stockPrice => stockPrice.stock[0].volume)
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: `Stock Price of ${this.name}`
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }
    });
  }
}
