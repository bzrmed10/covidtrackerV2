
import { Action } from "@ngrx/store";
import { AllDataByCountry } from "../models/all-data-by-country";
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
    dailyChartData : {
        confirmed : [], 
        deaths: [],
        recovred: [],
        dates:[]
    },
    tableData : AllDataByCountry[],
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
    dailyChartData : {
        confirmed : [], 
        deaths: [],
        recovred: [],
        dates: []
    },
    tableData : [],
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
             let newDataPerDay = {
                confirmed : (<DataActions>action).payload.confirmedPerDay,
                deaths : (<DataActions>action).payload.deathPerDay,
                recovred:(<DataActions>action).payload.recoveredPerDay,
                dates :(<DataActions>action).payload.dates,
             }
            return {
                ...state ,
                dataState:DataStateEnum.LOADED,
                chartData: newData,
                dailyChartData : newDataPerDay
            } 
        case DataActionsTypes.GET_CUMUL_GRAPH_DATA_ERROR: 
               
                return {
                    ...state ,
                    dataState:DataStateEnum.ERROR, 
                    errorMessage :(<DataActions>action).payload,
                }       
        case DataActionsTypes.GET_TABLE_DATA: 
            
                return {
                    ...state ,
                    dataState:DataStateEnum.LOADING, 
                                
                }
        case DataActionsTypes.GET_TABLE_DATA_SUCCESS: 
             let alldataByCountry :AllDataByCountry[];
             alldataByCountry = (<DataActions>action).payload;
                return {
                    ...state ,
                    dataState:DataStateEnum.LOADED, 
                    tableData : alldataByCountry,        
                }        
        case DataActionsTypes.GET_CUMUL_GRAPH_DATA_ERROR: 
               
                return {
                    ...state ,
                    dataState:DataStateEnum.ERROR, 
                    errorMessage :(<DataActions>action).payload,
                }                   
        default : return {...state} 
    }
}