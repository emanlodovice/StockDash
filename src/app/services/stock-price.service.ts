import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StockPrice } from '../models/StockPrice.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as dayjs from 'dayjs'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


type DateUnit = 'day' | 'month' | 'year';


@Injectable({
  providedIn: 'root'
})
export class StockPriceService {
  baseUrl:string = 'http://phisix-api.appspot.com/stocks/';

  constructor(private http:HttpClient) { }

  getStockPrice(code:string, date:dayjs.Dayjs): Observable<StockPrice> {
    const url = `${this.baseUrl}${code}.${date.format('YYYY-MM-DD')}.json`
    return this.http.get<StockPrice>(url);
  }

  getStockPriceByDateRange(code:string, start:dayjs.Dayjs, end:dayjs.Dayjs, step:number, unit:DateUnit):Observable<StockPrice[]> {
    let s:dayjs.Dayjs = dayjs(start);
    const e:dayjs.Dayjs = dayjs(end);

    const dates:dayjs.Dayjs[] = [];

    while(s > e) {
      // make sure to skip weekends
      var stockDate = this.getNearestWeekday(s);
      dates.push(stockDate);
      s = s.subtract(step, unit);
    }

    const requests:Observable<any>[] = dates.reverse()
      .map(date => this.getStockPrice(code, date).pipe(catchError(err => of(null))));
    
    return forkJoin(requests);
  }

  getNearestWeekday(date: dayjs.Dayjs): dayjs.Dayjs {
    if (date.day() === 0) {
      return date.subtract(2, 'day');
    } else if (date.day() === 6) {
      return date.subtract(1, 'day');
    }
    return date;
  }
}
