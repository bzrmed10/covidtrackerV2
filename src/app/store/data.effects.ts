import { combineLatest, merge, Observable , of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Actions, createEffect ,ofType } from "@ngrx/effects";

import { catchError, map ,mergeMap} from 'rxjs/operators';
import { DataServiceService } from '../services/data-service.service';
import {
    DataActions,
    DataActionsTypes,
    GetDataActionSuccess,
    GetDataActionError,
    GetCumulGraphDataActionSuccess,
    GetCumulGraphDataActionError
} from './data.actions';
import { DatePipe } from '@angular/common';
import { DateCountryData } from '../models/date-country-data';



@Injectable()
export class DataEffects {
        constructor( private effectActions :Actions ,
            private dataService : DataServiceService,private datepipe :DatePipe){}
         data;
         tableCase = [];
         tabledays = [];
         tabledeath = [];
         tableRecovered = [];
         dateCountryData;
         dateDeathByCountryData;
         dateRecovredByCountryData;
         selectedCountryData : DateCountryData [];
         selectedDeathByCountryData : DateCountryData [];
         selectedRecoveredByCountryData : DateCountryData [];
        getDataEffect:Observable<DataActions> = createEffect(
            
            ()=>this.effectActions.pipe(
                ofType(DataActionsTypes.GET_DATA),
                mergeMap((action : DataActions)=>{
                    return  this.dataService.getGlobalData()
                    .pipe(
                        map(result=>{
                        this.data = result; 
                        let items = this.data.filter(item => item.country == action.payload);
                        return new GetDataActionSuccess(items);     
                      }),
                      catchError(
                          (err)=>of(new GetDataActionError(err.message))
                                )
                          )

                    }))
            
        )
    

        getChartDataEffect:Observable<DataActions> = createEffect(
            
            ()=>this.effectActions.pipe(
                ofType(DataActionsTypes.GET_CUMUL_GRAPH_DATA),
                mergeMap((action : DataActions)=>{
                  const one$: Observable<any> = this.dataService.getDateCountryData().pipe(
                    map(result=>{
                      console.log("result")
                      this.dateCountryData = result;
                      this.selectedCountryData = this.dataService.getNumCasePerDay(this.dateCountryData[action.payload]);
                    })
                  );
                  const two$: Observable<any> = this.dataService.getDateDeathByCountryData().pipe(
                    map(result2=>{
                      console.log("result2")
                      this.dateDeathByCountryData = result2;
                      this.selectedDeathByCountryData = this.dataService.getNumCasePerDay(this.dateDeathByCountryData[action.payload])
                      
                    })
                  );
                  const three$: Observable<any> =   this.dataService.getDateRecoveredByCountryData().pipe(
                    map(result3=>{
                      console.log("result3")
                      this.dateRecovredByCountryData = result3; 
                      this.selectedRecoveredByCountryData = this.dataService.getNumCasePerDay(this.dateRecovredByCountryData[action.payload])
                    })
                  );

                  return  combineLatest(
                      [one$, two$, three$]
                      ).pipe(

                        map( result =>{

                            this.selectedCountryData.forEach(cs => {
                                this.tableCase.push(cs.cases);    
                                this.tabledays.push( this.datepipe.transform(cs.date, 'yyyy/MM/dd')); 
                              });
                              this.selectedDeathByCountryData.forEach(cs => {
                                  this.tabledeath.push(cs.cases);
                              });
                              this.selectedRecoveredByCountryData.forEach(cs => {
                                this.tableRecovered.push(cs.cases);
                            });
                            
                                return new GetCumulGraphDataActionSuccess(
                                    { dates : this.tabledays , 
                                      confirmed : this.tableCase,
                                      deaths : this.tabledeath,
                                      recovered : this.tableRecovered
                                    });
                                
                          }),
                          catchError(
                              (err)=>of(new GetCumulGraphDataActionError(err.message))
                                    )
                      );




                   
                    
                 /*   return  this.dataService.getGlobalData()
                    .pipe(
                        map(result=>{
                        this.data = result; 
                        let items = this.data.filter(item => item.country == action.payload);
                        return new GetDataActionSuccess(items);     
                      }),
                      catchError(
                          (err)=>of(new GetDataActionError(err.message))
                                )
                          )*/
                    }))
            
        )
    
    
    }