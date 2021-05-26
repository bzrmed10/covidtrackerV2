
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
    errorMessage : string,
    dataState : DataStateEnum,
    

}

const INIT_STATE :DataState = {
    country: "",
    countryData : null,
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

                  
        default : return {...state} 
    }
}