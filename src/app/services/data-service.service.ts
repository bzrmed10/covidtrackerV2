import { Injectable } from '@angular/core';
import { GlobalDataSummary } from '../models/global-data';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public dataChange= new Subject<GlobalDataSummary[]>();
  public caseType = new Subject<string>();
  private baseUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
  private globalDataUrl = '';
  extension = '.csv';
  day;
  month;
  year;
  constructor(private http : HttpClient) { 

    let date = new Date();
    this.day = date.getDate() - 1;
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();

    this.globalDataUrl = `${this.baseUrl}${this.getDate(this.month)}-${this.getDate(this.day)}-${this.year}${this.extension}`;

  }


  getDate(date : number){
    if(date < 10){
      return '0'+date;
    }
    return date;
  }

  getGlobalData(){
    return this.http.get(this.globalDataUrl,{responseType : 'text'}).pipe(
      map(result=>{
        // return result;
        let data : GlobalDataSummary[] = [];
        let rows = result.split('\n');
        rows.splice(0,1);
        let raw = {};
        rows.forEach(row=>{
          let cols = row.split(/,(?=\S)/);
          if(cols[3]){
            let cs = {
              country :cols[3],
              lat :+cols[5],
              long :+cols[6],
              confirmed : +cols[7],
              deaths : +cols[8],
              recovered : +cols[9],
              active : +cols[10]
  
            };
             let temp : GlobalDataSummary = raw[cs.country];
            
            if(temp){
              temp.active = cs.active + temp.active;
              temp.confirmed = cs.confirmed + temp.confirmed;
              temp.deaths = cs.deaths +temp.deaths;
              temp.recovered = cs.recovered + temp.recovered;
              raw[cs.country] = temp;
            }else{
              raw[cs.country] = cs;
            }
          }
          
          
        })
         
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
  }
}
