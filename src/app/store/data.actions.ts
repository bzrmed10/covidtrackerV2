import { Action } from "@ngrx/store";

export enum DataActionsTypes {
    GET_DATA = "[Home] Get data of country",
    GET_DATA_SUCCESS = "[Home] Get data of country success",
    GET_DATA_ERROR  = "[Home] Get data of country error",
    
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

export type DataActions = GetDataAction | GetDataActionSuccess | GetDataActionError;