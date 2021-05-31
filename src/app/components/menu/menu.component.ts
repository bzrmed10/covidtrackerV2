import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetCumulGraphDataAction, GetDataAction, GetTableDataAction, GetVaccinationDataAction } from 'src/app/store/data.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  defaultCountry :string;
  countries : string[] = [];
  data : GlobalDataSummary[];
  today = new Date();

  constructor(private dataService : DataServiceService,
    public route :ActivatedRoute,
    public router :Router,
    private store : Store<any>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get('country')){
        this.defaultCountry = params.get('country');
       
      }else{
        this.defaultCountry ="Morocco";
        
      }
    });
    

    this.dataService.getGlobalData().pipe(map(result=>{
      this.data = result;       
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
      })
      
    })).subscribe(()=>{
        this.store.dispatch(new GetDataAction(this.defaultCountry));

    });
  
  }



  onChangeCountry(country : string){
    this.defaultCountry = country;
    this.router.navigate(['/home',country]);
    this.store.dispatch(new GetDataAction(country)); 
    //this.store.dispatch(new GetCumulGraphDataAction(country));  
  }

  getcharts(){
    this.store.dispatch(new GetCumulGraphDataAction(this.defaultCountry));
  }

  getHistoryTable(){
    this.store.dispatch(new GetTableDataAction(this.defaultCountry));
  }

  getVaccinationData(){
    this.store.dispatch(new GetVaccinationDataAction(this.defaultCountry));
  }

}
