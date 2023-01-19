import { HttpClient } from '@angular/common/http';
import { Injectable ,OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Patrimonio } from '../models/patrimonio';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService implements OnDestroy {

  url : string = 'http://localhost:8080/api/patrimonio';
  subRef$: Subscription;
  constructor(private http : HttpClient, private dataService:DataService) { } 

  getPatrimonio(): Observable<Patrimonio[]>{
    return this.http.get<Patrimonio[]>(this.url+'/list');
  }

  insertPatrimonio(patrimonio:Patrimonio):Observable<Patrimonio>{
    return this.http.post<Patrimonio>(this.url+'/insert',  patrimonio);
  }

  listPatrimonio(id:number): Observable<Patrimonio>{
    return this.http.get<Patrimonio>(this.url+'/'+id);
  }


  updatePatrimonio(colaborador:Patrimonio):Observable<Patrimonio>{
    return this.http.put<Patrimonio>(this.url+'/update/'+colaborador.id, colaborador);
  }

  deletePatrimonio(id:number):Observable<any>{
    return this.http.delete<any>(this.url+'/delete/'+id);
  }

  ngOnDestroy(): void {
    
  }
}
 