import { Action } from "@ngrx/store";
import { AllDataByCountry } from "../models/all-data-by-country";
import { DateCountryData } from "../models/date-country-data";
import { VaccineData } from "../models/vaccine-data";
import { InfoVaccin } from '../models/infoVaccin';

export enum DataActionsTypes {
    GET_DATA = "[Home] Get data of country",
    GET_DATA_SUCCESS = "[Home] Get data of country success",
    GET_DATA_ERROR  = "[Home] Get data of country error",
    GET_CUMUL_GRAPH_DATA = "[Statistics] Get data for graphs by country",
    GET_CUMUL_GRAPH_DATA_SUCCESS = "[Statistics] Get data for graphs by country success",
    GET_CUMUL_GRAPH_DATA_ERROR  = "[Statistics] Get data for graphs by country error",
    GET_TABLE_DATA = "[History] Get data for table by country",
    GET_TABLE_DATA_SUCCESS = "[History] Get data for table by country success",
    GET_TABLE_DATA_ERROR  = "[History] Get data for table by country error",
    GET_VACCINE_DATA = "[Vaccine] Get vaccination data  by country",
    GET_VACCINE_DATA_SUCCESS = "[Vaccine] Get vaccination data by country success",
    GET_VACCINE_DATA_ERROR  = "[Vaccine] Get vaccination data by country error",
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


export class GetTableDataAction implements Action {
    type : DataActionsTypes = DataActionsTypes.GET_TABLE_DATA;
    constructor( public payload:string){}

}

export class GetTableDataActionSuccess implements Action {

    type : DataActionsTypes = DataActionsTypes.GET_TABLE_DATA_SUCCESS;
    constructor( public payload: AllDataByCountry[]){}
}

export class GetTableDataActionError implements Action {

    type : DataActionsTypes = DataActionsTypes.GET_TABLE_DATA_ERROR;
    constructor( public payload:string){}
}

export class GetVaccinationDataAction implements Action {
    type : DataActionsTypes = DataActionsTypes.GET_VACCINE_DATA;
    constructor( public payload:string){}

}
export class GetVaccinationDataActionSuccess implements Action {
    type : DataActionsTypes = DataActionsTypes.GET_VACCINE_DATA_SUCCESS;
    constructor( public payload:{data :VaccineData [] , infoVaccine : InfoVaccin}){}

}
export class GetVaccinationDataActionError implements Action {
    type : DataActionsTypes = DataActionsTypes.GET_VACCINE_DATA_ERROR;
    constructor( public payload:string){}

}

export type DataActions = 
GetDataAction | GetDataActionSuccess | GetDataActionError |
GetCumulGraphDataAction | GetCumulGraphDataActionSuccess | GetCumulGraphDataActionError |
GetTableDataAction | GetTableDataActionSuccess | GetTableDataActionError |
GetVaccinationDataAction | GetVaccinationDataActionSuccess | GetVaccinationDataActionError;