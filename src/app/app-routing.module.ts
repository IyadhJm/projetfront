import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { MainComponent } from './main/main.component';
import { ProduitComponent } from './produit/produit.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path:'', component: MainComponent,
  children:[
    {path: '', component: ProduitComponent},
    {path: 'categories', component: CategoriesComponent},
  ]}
  
     
    ])] ,
  exports: [RouterModule]
})
export class AppRoutingModule { }
