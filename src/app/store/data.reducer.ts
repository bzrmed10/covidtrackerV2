
import { Action } from "@ngrx/store";
import { GlobalDataSummary } from "../models/global-data";
import { DataActions, DataActionsTypes } from "./data.actions";


export enum DataStateEnum {
    LOADING = "Loading",
    LOADED = "Loaded",
    ERROR = "Error",
    INITIAL = "Initial",
}

export interface DataState {
    country: string,
    countryData : GlobalDataSummary,
    chartData : {
        confirmed : [], 
        deaths: [],
        recovred: [],
        dates:[]
    },
    errorMessage : string,
    dataState : DataStateEnum,
    

}

const INIT_STATE :DataState = {
    country: "",
    countryData : null,
    chartData : {
        confirmed : [], 
        deaths: [],
        recovred: [],
        dates: []
    },
    errorMessage : "",
    dataState : DataStateEnum.INITIAL ,

}

export function dataReducer(state = INIT_STATE ,action :Action ) :DataState {
    switch(action.type){
        case DataActionsTypes.GET_DATA: 
            return {
                ...state ,
                dataState:DataStateEnum.LOADING,
                country:(<DataActions>action).payload,   
            }
        case DataActionsTypes.GET_DATA_SUCCESS: 
            return {
                ...state ,
                dataState:DataStateEnum.LOADED,
                countryData:(<DataActions>action).payload
                  
            }
        case DataActionsTypes.GET_DATA_ERROR: 
            return {
                ...state ,
                dataState:DataStateEnum.ERROR,
                errorMessage:(<DataActions>action).payload
                  
            }      
        case DataActionsTypes.GET_CUMUL_GRAPH_DATA: 
            
            return {
                ...state ,
                dataState:DataStateEnum.LOADING, 
                            
            }
        case DataActionsTypes.GET_CUMUL_GRAPH_DATA_SUCCESS: 
             let newData = {
                confirmed : (<DataActions>action).payload.confirmed,
                deaths : (<DataActions>action).payload.deaths,
                recovred:(<DataActions>action).payload.recovered,
                dates :(<DataActions>action).payload.dates,
             }
            return {
                ...state ,
                dataState:DataStateEnum.LOADED,
                chartData: newData
            } 
        case DataActionsTypes.GET_CUMUL_GRAPH_DATA_ERROR: 
               
                return {
                    ...state ,
                    dataState:DataStateEnum.LOADED, 
                    errorMessage :(<DataActions>action).payload,
                }       
                  
        default : return {...state} 
    }
}