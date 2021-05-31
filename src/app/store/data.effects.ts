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
    GetCumulGraphDataActionError,
    GetTableDataActionSuccess,
    GetTableDataActionError,
    GetVaccinationDataActionSuccess,
    GetVaccinationDataActionError
} from './data.actions';
import { DatePipe } from '@angular/common';
import { DateCountryData } from '../models/date-country-data';
import { AllDataByCountry } from '../models/all-data-by-country';



@Injectable()
export class DataEffects {
        constructor( private effectActions :Actions ,
            private dataService : DataServiceService,private datepipe :DatePipe){}
         

         getDataEffect:Observable<DataActions> = createEffect(
           
            ()=>this.effectActions.pipe(
                ofType(DataActionsTypes.GET_DATA),
                mergeMap((action : DataActions)=>{
                  let data;
                    return  this.dataService.getGlobalData()
                    .pipe(
                        map(result=>{
                        data = result; 
                        let items = data.filter(item => item.country == action.payload);
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
                  let tableCase = [];
                  let tabledays = [];
                  let tabledeath = [];
                  let tableRecovered = [];
                  let casesPerDay = [];
                  let deathPerDay = [];
                  let recoveredPerDay = [];
                  let dateCountryData;
                  let dateDeathByCountryData;
                  let dateRecovredByCountryData;
                  let selectedCountryData : DateCountryData [];
                  let selectedDeathByCountryData : DateCountryData [];
                  let selectedRecoveredByCountryData : DateCountryData [];
                  const one$: Observable<any> = this.dataService.getDateCountryData().pipe(
                    map(result=>{
                      
                      dateCountryData = result;
                      selectedCountryData = this.dataService.getNumCasePerDay(dateCountryData[action.payload]);
                    })
                  );
                  const two$: Observable<any> = this.dataService.getDateDeathByCountryData().pipe(
                    map(result2=>{
                      dateDeathByCountryData = result2;
                      selectedDeathByCountryData = this.dataService.getNumCasePerDay(dateDeathByCountryData[action.payload])
                      
                    })
                  );
                  const three$: Observable<any> =   this.dataService.getDateRecoveredByCountryData().pipe(
                    map(result3=>{
                        dateRecovredByCountryData = result3; 
                        selectedRecoveredByCountryData = this.dataService.getNumCasePerDay(dateRecovredByCountryData[action.payload])
                    })
                  );

                  return  combineLatest(
                      [one$, two$, three$]
                      ).pipe(

                        map( result =>{

                            selectedCountryData.forEach(cs => {
                                tableCase.push(cs.cases);    
                                casesPerDay.push(cs.numbercasesperdate);
                                tabledays.push( this.datepipe.transform(cs.date, 'yyyy/MM/dd')); 
                      
                              });
                              selectedDeathByCountryData.forEach(cs => {
                                  tabledeath.push(cs.cases);
                                  deathPerDay.push(cs.numbercasesperdate);
                              });
                              selectedRecoveredByCountryData.forEach(cs => {
                                tableRecovered.push(cs.cases);
                                recoveredPerDay.push(cs.numbercasesperdate);
                            });
                            
                                return new GetCumulGraphDataActionSuccess(
                                    { dates : tabledays , 
                                      confirmed : tableCase,
                                      deaths : tabledeath,
                                      recovered : tableRecovered,
                                      confirmedPerDay : casesPerDay,
                                      deathPerDay : deathPerDay,
                                      recoveredPerDay : recoveredPerDay
                                    });
                                
                          }),
                          catchError(
                            
                              (err)=> of(new GetCumulGraphDataActionError(err.message))
                                    )
                      );




                   
                   
                    }))
            
        )
    
        getTableDataEffect:Observable<DataActions> = createEffect(
            
          ()=>this.effectActions.pipe(
              ofType(DataActionsTypes.GET_TABLE_DATA),
              mergeMap((action : DataActions)=>{
              
                let dateCountryData;
                let dateDeathByCountryData;
                let dateRecovredByCountryData;
                let selectedCountryData : DateCountryData [];
                let selectedDeathByCountryData : DateCountryData [];
                let selectedRecoveredByCountryData : DateCountryData [];
                const one$: Observable<any> = this.dataService.getDateCountryData().pipe(
                  map(result=>{
                    
                    dateCountryData = result;
                    selectedCountryData = this.dataService.getNumCasePerDay(dateCountryData[action.payload]);
                  })
                );
                const two$: Observable<any> = this.dataService.getDateDeathByCountryData().pipe(
                  map(result2=>{
                    dateDeathByCountryData = result2;
                    selectedDeathByCountryData = this.dataService.getNumCasePerDay(dateDeathByCountryData[action.payload])
                    
                  })
                );
                const three$: Observable<any> =   this.dataService.getDateRecoveredByCountryData().pipe(
                  map(result3=>{
                      dateRecovredByCountryData = result3; 
                      selectedRecoveredByCountryData = this.dataService.getNumCasePerDay(dateRecovredByCountryData[action.payload])
                  })
                );

                return  combineLatest(
                    [one$, two$, three$]
                    ).pipe(

                      map( result =>{
                        let alldataByCountry :AllDataByCountry[];
                        alldataByCountry = this.dataService.mergeData(selectedCountryData, selectedDeathByCountryData,selectedRecoveredByCountryData);
                          
                              return new GetTableDataActionSuccess(alldataByCountry);
                              
                        }),
                        catchError(
                          
                            (err)=> of(new GetTableDataActionError(err.message))
                                  )
                    );




                 
                 
                  }))
          
      )


      getVaccineDataEffect:Observable<DataActions> = createEffect(
            
        ()=>this.effectActions.pipe(
          ofType(DataActionsTypes.GET_VACCINE_DATA),
          mergeMap((action : DataActions)=>{
            let data;
              return  this.dataService.getVaccinationData(action.payload)
              .pipe(
                  map(result=>{
                  data = result; 
                  return new GetVaccinationDataActionSuccess(data);     
                }),
                catchError(
                    (err)=>of(new GetVaccinationDataActionError(err.message))
                          )
                    )

              }))
        
    )

      
    }