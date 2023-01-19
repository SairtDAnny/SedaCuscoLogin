import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../models/colaborador';
import { Oficina } from '../models/oficina';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  url : string = 'http://localhost:8080/api/colaborador';

  constructor(private http:HttpClient) { }
 
  getColaborador(): Observable<Colaborador[]>{
    return this.http.get<Colaborador[]>(this.url+'/list');
  }

  getOficina():Observable<Oficina[]>{
    return this.http.get<Oficina[]>(this.url+'/oficina/list');
  }

  insertColaborador(colaborador:Colaborador):Observable<Colaborador>{
    return this.http.post<Colaborador>(this.url+'/insert',  colaborador);
  }

  obtenerColaborador(id:string): Observable<Colaborador>{
    return this.http.get<Colaborador>(this.url+'/'+id);
  }

  actualizarColaborador(colaborador:Colaborador):Observable<Colaborador>{
    return this.http.put<Colaborador>(this.url+'/update/'+colaborador.id, colaborador);
  }

  eliminarColaborador(idDniColaborador:string):Observable<any>{
    return this.http.delete<any>(this.url+'/delete/'+idDniColaborador);
  }
}