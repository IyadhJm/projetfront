import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitServiceService {

 constructor(private httpclient: HttpClient) { }
   

    getData()
    {
     return this.httpclient.get('http://127.0.0.1:8080/produit/getProduit');
    }
   
  
    insertData(id:any,data:any )
    {
      return this.httpclient.post('http://127.0.0.1:8080/produit/saveProduit/'+id,data);
    }
  
    deleteData(id:any)
    {
      return this.httpclient.delete('http://127.0.0.1:8080/produit/delete'+id);
    }
    getOneProduit(id:any)
    {
      return this.httpclient.get('http://127.0.0.1:8080/produit/'+id); 
    }
  
    updateData(id:any,data:any)
    {
      return this.httpclient.put('http://127.0.0.1:8080/produit/updateProduit/'+id,data);
    }
    
      
    
  
}
