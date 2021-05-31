import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HistoryComponent } from "./components/history/history.component";
import { HomeComponent } from "./components/home/home.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { VaccineComponent } from "./components/vaccine/vaccine.component";

const routes: Routes = [
    { path : '' , redirectTo:'home' ,pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'vaccine', component: VaccineComponent },
    {path: '**', redirectTo: 'home'}
    ];
    
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }