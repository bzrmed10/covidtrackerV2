import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from 'src/app/services/data-service.service';
import { VaccineData } from '../../models/vaccine-data';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DataState, DataStateEnum } from 'src/app/store/data.reducer';
import { InfoVaccin } from '../../models/infoVaccin';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

 
  displayedColumns: string[] = [ 'date','total_vaccinations','total_vaccinations_per_hundred','people_vaccinated','people_vaccinated_per_hundred','people_fully_vaccinated','people_fully_vaccinated_per_hundred','daily_vaccinations'];
  dataSource: MatTableDataSource<VaccineData>;
  infoVac : InfoVaccin;

  @ViewChild(MatPaginator ,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort ,{static:false}) sort: MatSort;

  dataState$ :Observable <DataState> | null = null;
  dataState: DataStateEnum;
  readonly DataStateEnum = DataStateEnum;
  constructor(private store : Store<any>) { }

  ngOnInit(): void {

    this.store.select('dataState').subscribe((state)=>{
      this.dataState = state.dataState;
      this.infoVac = state.vaccineData.info;
    
      this.dataSource = new MatTableDataSource(state.vaccineData.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

       });
  }

}
