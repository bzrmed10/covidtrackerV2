import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataState ,DataStateEnum } from 'src/app/store/data.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  dataState$ :Observable <DataState> | null = null;
  appState: DataState;
  readonly DataStateEnum = DataStateEnum;
  constructor(private store : Store<any>) { }

  ngOnInit(): void {
    

    this.dataState$ = this.store.pipe(
      map(
        (state) => { 
          this.appState = state.countryData;
          return state.dataState;
        }
        ));
   
  }

 

}
