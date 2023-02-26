import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ngxCsv } from 'ngx-csv';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriesServiceService } from '../categories-service.service';
import { Categories } from '../categories/categories.module';
import { ProduitServiceService } from '../produit-service.service';
import { Produit } from './produit.module';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent {
  categories=[]
  selectedCategorie;
  selectedCategorie1;
  selectedCategory: any = null;
  produitDialog!: boolean;
 updateproduitDialog!:boolean;
   produits:any;
   submitted!:boolean;
   cat=new Categories();
   produit= new Produit();
   id:any;
   disabled: boolean = true;
   value5: string = 'Disabled';
  idprod: number;
  
   constructor(private Categoriesservice:CategoriesServiceService,private produitService:ProduitServiceService,private confirmationService: ConfirmationService,private messageService: MessageService){} 
 

   dispo: any[] = [{name: 'Oui', key: 'O'}, {name: 'Non', key: 'N'}];
   
   ngOnInit(): void {
    
    this.Categoriesservice.getData().subscribe((res : any)=>{
    console.log("reeees", res)
    this.categories=res
    
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
   onCategorieChange($event)
   {
   console.log("eveentValue", this.selectedCategorie);

   }  
 
   insertData()
   { 
    
    this.cat.produit=this.produit;
    this.submitted=true;
    this.produit.categoriesId=this.selectedCategorie;
    if (this.selectedCategory==this.dispo[0])
    {this.produit.disponible=true;}
    else
    {this.produit.disponible=false;}
    this.cat.produit=this.produit;
    console.log("chnwafihaaa", this.categories);
    this.id=this.selectedCategorie;
     this.produitService.insertData(this.id ,this.produit).subscribe(res=>{
       this.getProduitData();
       this.produitDialog= false;
   })
    
   }
 
   updateData()
 
   {
     this.submitted=true;
     
     
     this.selectedCategorie=this.produit.categoriesId;
     this.idprod=this.selectedCategorie;
     console.log("aaaa",this.selectedCategorie)
     this.id=this.selectedCategorie;
     this.produitService.updateData(this.id,this.produit).subscribe(res=>{
       this.getProduitData();
       this.updateproduitDialog = false;
  })
    
   }
    
 
   deleteData(id: any)
   {
     this.confirmationService.confirm({
       message: 'Are you sure you want to delete ' + this.produit.id + '?',
       header: 'Confirm',
       icon: 'pi pi-exclamation-triangle',
       accept: () => {
           this.produits = this.produits.filter(val => val.id !== this.produit.id);
           this.produit = {};
           this.produitService.deleteData(id).subscribe(res=>{
             this.getProduitData();
           })  
           this.messageService.add({severity:'success', summary: 'Successful', detail: 'employe Deleted', life: 3000});
       }
   });
  
   }
 
 
 
 
 
 openNew() {
   this.produit = {};
   this.submitted = false;
   this.produitDialog = true;
}
 
 
 
 
 
 
 editProduit(produit: Produit) {
 this.produit = {...produit};
 this.updateproduitDialog = true;
 }
 
 
 hideDialog() {
 this.produitDialog = false;
 this.submitted = false;
 }
 
 
 
 
 
 
 findIndexById(id: any): number {
 let index = -1;
 for (let i = 0; i < this.produits.length; i++) {
   if (this.produits[i].id === id) {
       index = i;
       break;
   }
 }
 
 return index;
 }
 
 createId(): any {
 let id = '';
 var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
      
      
        didDrawPage: (dataArg) => { 
         doc.text('categories', dataArg.settings.margin.left, 10);
        }
   }); 
      doc.save('categories.pdf');
    }
 
 }