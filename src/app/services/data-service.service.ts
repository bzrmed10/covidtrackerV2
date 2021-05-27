import { Injectable } from '@angular/core';
import { GlobalDataSummary } from '../models/global-data';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DateCountryData } from '../models/date-country-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public dataChange= new Subject<GlobalDataSummary[]>();
  public caseType = new Subject<string>();
  private dateCountryDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
  private dateDeathByCountryDataUrl ='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'
  private dateRecoveredByCountryDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';
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

  getDateCountryData(){
    return this.http.get(this.dateCountryDataUrl,{responseType : 'text'})
    .pipe(map(result=>{
      let rows = result.split('\n');
      let mainData = {};
      let header = rows[0];
      let dates = header.split(/,(?=\S)/);
      dates.splice(0 , 4);
      rows.splice(0 , 1);
      rows.forEach(row =>{
        let cols = row.split(/,(?=\S)/);
        let country = cols[1];
        cols.splice(0 , 4);
        mainData[country]=[];
        cols.forEach((value,index)=>{
          let dc :DateCountryData = {
            cases : +value,
            country : country,
            date : new Date(Date.parse(dates[index]))
          }
          mainData[country].push(dc);
          
          
        })
        
        
        
      })
      return mainData;
      
    }));
  }

  getDateRecoveredByCountryData(){
    return this.http.get(this.dateRecoveredByCountryDataUrl,{responseType : 'text'})
    .pipe(map(result=>{
      let rows = result.split('\n');
      let mainData = {};
      let header = rows[0];
      let dates = header.split(/,(?=\S)/);
      dates.splice(0 , 4);
      rows.splice(0 , 1);
      rows.forEach(row =>{
        let cols = row.split(/,(?=\S)/);
        let country = cols[1];
        cols.splice(0 , 4);
        mainData[country]=[];
        cols.forEach((value,index)=>{
          let dc :DateCountryData = {
            cases : +value,
            country : country,
            date : new Date(Date.parse(dates[index]))
          }
          mainData[country].push(dc);
          
          
        })
        
        
        
      })
      return mainData;
      
    }));
  }

  getDateDeathByCountryData(){
    return this.http.get(this.dateDeathByCountryDataUrl,{responseType : 'text'})
    .pipe(map(result=>{
      let rows = result.split('\n');
      let mainData = {};
      let header = rows[0];
      let dates = header.split(/,(?=\S)/);
      dates.splice(0 , 4);
      rows.splice(0 , 1);
      rows.forEach(row =>{
        let cols = row.split(/,(?=\S)/);
        let country = cols[1];
        cols.splice(0 , 4);
        mainData[country]=[];
        cols.forEach((value,index)=>{
          let dc :DateCountryData = {
            cases : +value,
            country : country,
            date : new Date(Date.parse(dates[index]))
          }
          mainData[country].push(dc);
          
          
        })
        
        
        
      })
      return mainData;
      
    }));
  }

  getNumCasePerDay(data:DateCountryData []){

    for(let i=0;i<data.length;i++){
      if(i == 0) {
        data[i].numbercasesperdate = data[i].cases;
      }
      else{
        data[i].numbercasesperdate =  data[i].cases-data[i-1].cases;
      }
      
    }
    
    return data;
  }
  
}
