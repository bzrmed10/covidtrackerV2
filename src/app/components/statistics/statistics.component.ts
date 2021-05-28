import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DataState, DataStateEnum } from 'src/app/store/data.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  chartOptions={};
  chartOptionsPerDay={}
  Highcharts =Highcharts;
  HighchartsPerDay = Highcharts;
 
  dataState$ :Observable <DataState> | null = null;
  dataState: DataStateEnum;
  readonly DataStateEnum = DataStateEnum;
  country;
  constructor(private dataService : DataServiceService ,
    private store : Store<any>,
    public datepipe: DatePipe,
    public route :ActivatedRoute,
    public router :Router) { }

  ngOnInit(): void {


     this.store.select('dataState').subscribe((state)=>{
       this.country = state.country;
       this.dataState = state.dataState;
       this.setChartOptions(
         Highcharts,
         state.chartData.dates,
         state.chartData.confirmed,
         state.chartData.recovred,
         state.chartData.deaths);


       this.setChartOptionsPerDay(
          this.HighchartsPerDay,
          state.dailyChartData.dates,
          state.dailyChartData.confirmed,
          state.dailyChartData.recovred,
          state.dailyChartData.deaths);
        });
        
         
    }



  

  setChartOptions(Highcharts,tabledays,tableCase,tableRecovered,tabledeath){
    this.chartOptions = {
      chart: {
          //type: 'area'
      },
      title: {
          text: 'Cumulative graph of corona virus evolution'
      },
      subtitle: {
          text: null
      },
      xAxis: {
          categories: tabledays,
          tickmarkPlacement: 'on',
          title: {
              enabled: false
          }
      },
      yAxis: {
          title: {
              text: 'Cases'
          }
    
      },
      tooltip: {
          split: true,
          valueSuffix: ' cases'
      },
      credits: {
        enabled:false
      },
      exporting : {
        enabled:true
      },
      plotOptions: {
          area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                  lineWidth: 1,
                  lineColor: '#666666'
              }
          }
      },
      series: [{
          name: 'Confirmed',
          data: tableCase,
      }
      , {
        
        name: 'Deaths',
        data: tabledeath,
        color:"#f78181"
      },
      {
        name: 'Recovered',
        data: tableRecovered,
        color:"#8eec7a96"
  
       
    }
    ]
    };
    HC_exporting(Highcharts);
  setTimeout(()=>{
   window.dispatchEvent(
     new Event('resize')
     );
  },300);
  }

  setChartOptionsPerDay(Highcharts,tabledays,tableCase,tableRecovered,tabledeath){

    
    this.chartOptionsPerDay = {
      chart: {
          //type: 'area'
      },
      title: {
          text: 'COVID-19 Daily Statistics '
      },
      subtitle: {
          text: null
      },
      xAxis: {
          categories: tabledays,
          tickmarkPlacement: 'on',
          title: {
              enabled: false
          }
      },
      yAxis: {
          title: {
              text: 'Cases'
          }
    
      },
      tooltip: {
          split: true,
          valueSuffix: ' cases'
      },
      credits: {
        enabled:false
      },
      exporting : {
        enabled:true
      },
      plotOptions: {
          area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                  lineWidth: 1,
                  lineColor: '#666666'
              }
          }
      },
      series: [{
          name: 'Confirmed',
          data: tableCase,
      }
      , {
        
        name: 'Deaths',
        data: tabledeath,
        color:"#f78181"
      },
      {
        name: 'Recovered',
        data: tableRecovered,
        color:"#8eec7a96"
       
    }
    ]
    };
    HC_exporting(Highcharts);
  setTimeout(()=>{
   window.dispatchEvent(
     new Event('resize')
     );
  },300);
  }


  
}



