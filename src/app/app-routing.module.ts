import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HistoryComponent } from "./components/history/history.component";
import { HomeComponent } from "./components/home/home.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";

const routes: Routes = [
    { path : '' , redirectTo:'home' ,pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path:'home/:country' ,component:HomeComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path:'statistics/:country' ,component:HomeComponent },
    { path: 'history', component: HistoryComponent },
    ];
    
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }