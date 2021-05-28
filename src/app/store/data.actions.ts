import { Action } from "@ngrx/store";
import { DateCountryData } from "../models/date-country-data";

export enum DataActionsTypes {
    GET_DATA = "[Home] Get data of country",
    GET_DATA_SUCCESS = "[Home] Get data of country success",
    GET_DATA_ERROR  = "[Home] Get data of country error",
    GET_CUMUL_GRAPH_DATA = "[Statistics] Get data for graphs by country",
    GET_CUMUL_GRAPH_DATA_SUCCESS = "[Statistics] Get data for graphs by country success",
    GET_CUMUL_GRAPH_DATA_ERROR  = "[Statistics] Get data for graphs by country error",
    
}


export class GetDataAction implements Action {

    type : DataActionsTypes = DataActionsTypes.GET_DATA;
    constructor( public payload:string){}
}

export class GetDataActionSuccess implements Action {

    type : DataActionsTypes = DataActionsTypes.GET_DATA_SUCCESS;
    constructor( public payload:any){}
}

export class GetDataActionError implements Action {

    type : DataActionsTypes = DataActionsTypes.GET_DATA_ERROR;
    constructor( public payload:string){}
}



export class GetCumulGraphDataAction implements Action {

    type : DataActionsTypes = DataActionsTypes.GET_CUMUL_GRAPH_DATA;
    constructor( public payload:string){}
}

export class GetCumulGraphDataActionSuccess implements Action {

    type : DataActionsTypes = DataActionsTypes.GET_CUMUL_GRAPH_DATA_SUCCESS;
    constructor( public payload:{dates : number[] , confirmed : number[] ,
         deaths : number[], recovered : number[],confirmedPerDay : number[],
          deathPerDay : number[],recoveredPerDay : number[]}){}
}

export class GetCumulGraphDataActionError implements Action {

    type : DataActionsTypes = DataActionsTypes.GET_CUMUL_GRAPH_DATA_ERROR;
    constructor( public payload:string){}
}
export type DataActions = 
GetDataAction | GetDataActionSuccess | GetDataActionError |
GetCumulGraphDataAction | GetCumulGraphDataActionSuccess | GetCumulGraphDataActionError;