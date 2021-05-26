import { Observable , of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Actions, createEffect ,ofType } from "@ngrx/effects";

import { catchError, map ,mergeMap} from 'rxjs/operators';
import { DataServiceService } from '../services/data-service.service';
import {
    DataActions,
    DataActionsTypes,
    GetDataActionSuccess,
    GetDataActionError
} from './data.actions';



@Injectable()
export class DataEffects {
        constructor( private effectActions :Actions ,private dataService : DataServiceService){}
         data;

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
            


  
    
        


        
        )}