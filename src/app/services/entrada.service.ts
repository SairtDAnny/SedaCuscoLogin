import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../models/colaborador';
import { Entrada } from '../models/entrada';
import { Patrimonio } from '../models/patrimonio';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  url : string = 'http://localhost:8080/api/entrada';

  constructor(private http:HttpClient) { }
 
  getEntrada(): Observable<Entrada[]>{
    return this.http.get<Entrada[]>(this.url+'/list');
  }
  //listar para el combo
  getPatrimonio():Observable<Patrimonio[]>{
    return this.http.get<Patrimonio[]>(this.url+'/patrimonio/list');
  }
  //listar para el combo
  /*getColaborador():Observable<Colaborador[]>{
    return this.http.get<Colaborador[]>(this.url+'/colaborador/list');
  }*/

  insertEntrada(entrada:Entrada):Observable<Entrada>{
    return this.http.post<Entrada>(this.url+'/insert',  entrada);
  }

  listIdEntrada(id:number): Observable<Entrada>{
    return this.http.get<Entrada>(this.url+'/'+id);
  }

  updateEntrada(entrada:Entrada):Observable<Entrada>{
    return this.http.put<Entrada>(this.url+'/update/'+entrada.id, entrada);
  }

  deleteEntrada(id:number):Observable<any>{
    return this.http.delete<any>(this.url+'/delete/'+id);
  }
}