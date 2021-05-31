import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateCountryData } from 'src/app/models/date-country-data';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DataState, DataStateEnum } from 'src/app/store/data.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = [ 'date','numbercasesperday','numberdeathperday','numberrecovredperday'];
  dataSource: MatTableDataSource<DateCountryData>;
  @ViewChild(MatPaginator ,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort ,{static:false}) sort: MatSort;

  dataState$ :Observable <DataState> | null = null;
  dataState: DataStateEnum;
  readonly DataStateEnum = DataStateEnum;
  constructor(private store : Store<any>) { }

  ngOnInit(): void {

    this.store.select('dataState').subscribe((state)=>{
      this.dataState = state.dataState;
      this.dataSource = new MatTableDataSource(state.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

       });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
