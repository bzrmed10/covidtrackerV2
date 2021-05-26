import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  defaultCountry :string;
  countries : string[] = [];
  data : GlobalDataSummary[];
  dataMap;
  totalActive;
  totalComfirmed  ;
  totalDeath ;
  totalRecovered ;

  constructor(private dataService : DataServiceService,
    public route :ActivatedRoute,
    public router :Router) { }

  ngOnInit(): void {
    
    if(this.route.snapshot.params['country']){
      this.defaultCountry = this.route.snapshot.params['country'];

    }else{
    this.defaultCountry ="Morocco";
    }

    this.dataService.getGlobalData().pipe(map(result=>{
      this.data = result;       
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
      })
      
    })).subscribe(()=>{
         this.onChangeCountry(this.defaultCountry);
    });
  
  }



  onChangeCountry(country : string){
    this.router.navigate(['/home',country]);
    let items = this.data.filter(item => item.country == country);
    this.dataMap = items;
    console.log(this.data);
    this.dataService.dataChange.next(this.dataMap);
    this.dataService.caseType.next('all');

    this.data.forEach(cs =>{
      
      if(cs.country === country){
        this.totalActive = cs.active;
        this.totalComfirmed = cs.confirmed;
        this.totalDeath = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
      
    })
    
   
   
  }


}
