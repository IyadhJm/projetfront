import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

 constructor(private httpclient: HttpClient) { }
   

    getData()
    {
     return this.httpclient.get('http://127.0.0.1:8080/categories/getCategories');
    }
  
    insertData(data:any)
    {
      return this.httpclient.post('http://127.0.0.1:8080/categories/saveCategories',data);
    }
    getProdCat(id:any)
    {
      {
        return this.httpclient.get('http://127.0.0.1:8080/categories/getProdCat/'+id);
       } 
    }
  
    deleteData(id:any)
    {
      return this.httpclient.delete('http://127.0.0.1:8080/categories/delete'+id);
    }
    getOneCategorie(id:any)
    {
      return this.httpclient.get('http://127.0.0.1:8080/categories/'+id); 
    }
  
    updateData(id:any,data:any)
    {
      return this.httpclient.put('http://127.0.0.1:8080/categories/updateCategories'+id,data);
    }
    
      
    
  
}