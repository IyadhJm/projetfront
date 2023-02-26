import { Component, ElementRef , ViewChild } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriesServiceService } from '../categories-service.service';
import { ProduitServiceService } from '../produit-service.service';
import { Categories } from './categories.module';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Title } from '@angular/platform-browser';
import  jsPDF from 'jspdf';

import { sample } from 'rxjs';
import autoTable from 'jspdf-autotable';
import { Produit } from '../produit/produit.module';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @ViewChild('cat') cat!: ElementRef;
  selectedId;
   categorieDialog!: boolean;
   produitdialog:boolean;
   updatecategorieDialog!:boolean;
   categories:any;
   submitted!:boolean;
   categorie= new Categories();
   produit =new Produit();
  prod:any;
   data;
   cate:any;
  produits;
   constructor(private Categoriesservice:CategoriesServiceService,private produitService:ProduitServiceService,private confirmationService: ConfirmationService,private messageService: MessageService){} 
 
   ngOnInit(): void {
    this.getCategorieData();
   }
   getCategorieData()
   {
    this.Categoriesservice.getData().subscribe(res=>{
      this.categories=res;
    })
   
   this.getProduitData();
    
  }
  getProduitData()
  {
   this.produitService.getData().subscribe(res=>{
     this.produits=res;
     console.log("rees",res)
   })
  }
  prodCat(id:any){
    this.submitted=true;
      
    this.Categoriesservice.getProdCat(id).subscribe(res=>{
      this.prod=res;
    })
    this.produitdialog = true;

  }
 
   insertData()
   {
     this.submitted=true;
     
     this.Categoriesservice.insertData(this.categorie).subscribe(res=>{
       this.getCategorieData();
       this.categorieDialog = false;
   })
    
   }
 
 
 
   updateData()
 
   {
     this.submitted=true;
     this.Categoriesservice.updateData(this.categorie.id,this.categorie).subscribe(res=>{
       this.getCategorieData();
       this.updatecategorieDialog = false;
  })
    
   }
  
 
 
   deleteData(id: any)
   {
     this.confirmationService.confirm({
       message: 'Are you sure you want to delete ' + this.categorie.id + '?',
       header: 'Confirm',
       icon: 'pi pi-exclamation-triangle',
       accept: () => {
           this.categories = this.categories.filter(val => val.id !== this.categorie.id);
           this.categorie = {};
           this.Categoriesservice.deleteData(id).subscribe(res=>{
             this.getCategorieData();
           })  
           this.messageService.add({severity:'success', summary: 'Successful', detail: 'employe Deleted', life: 3000});
       }
   });
  
   }
 
 
 
 
 
 openNew() {
   this.categorie = {};
   this.submitted = false;
   this.categorieDialog = true;}

 editCategorie(categorie: Categories) {
 this.categorie = {...categorie};
 this.updatecategorieDialog = true;
 }
 
 hideDialog() {
 this.categorieDialog = false;
 this.submitted = false;
 }

 findIndexById(id: any): number {
 let index = -1;
 for (let i = 0; i < this.categories.length; i++) {
   if (this.categories[i].id === id) {
       index = i;
       break;
   }
 }
 
 return index;
 }
 
 createId(): any {
 let id = '';
 let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 for ( let i = 0; i < 5; i++ ) {
   id += chars.charAt(Math.floor(Math.random() * chars.length));
 }
 return id;
 }
 downlodCsvFil(){
 new ngxCsv(this.categories, 'Categories');
}

  makePdf(){
    const doc = new jsPDF('p','pt');
          
    autoTable(doc, {
    
      body: this.categories,
      didDrawPage: (dataArg) => { 
       doc.text('categories', dataArg.settings.margin.left, 10);
      }
 }); 
    doc.save('categories.pdf');
  }

    

}

