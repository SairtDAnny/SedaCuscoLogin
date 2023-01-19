import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListarporDni } from '../models/ListarporDni';
import { Colaborador } from '../models/colaborador';
import { Patrimonio } from '../models/patrimonio';
import { Salida } from '../models/salida';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  url : string = 'http://localhost:8080/api/salida';

  filtroSalida : '';

  constructor(private http:HttpClient) { }
 
  getSalida(): Observable<Salida[]>{
    return this.http.get<Salida[]>(this.url+'/list');
  }
  //LISTAR PENTREGAS POR DNI

  getDniSalida(colaborador: String): Observable<Salida[]>{
    console.log("entra al servi "+colaborador);
    return this.http.get<Salida []>(this.url+'/dni/'+colaborador);
    console.log(colaborador);
  }

  //listar para el combo
  getPatrimonio():Observable<Patrimonio[]>{
    return this.http.get<Patrimonio[]>(this.url+'/patrimonio/list');
  }
  //listar para el combo
  getColaborador():Observable<Colaborador[]>{
    return this.http.get<Colaborador[]>(this.url+'/colaborador/list');
  }

  insertSalida(salida:Salida):Observable<Salida>{
    return this.http.post<Salida>(this.url+'/insert',  salida);
  }

  listIdSalida(id:number): Observable<Salida>{
    return this.http.get<Salida>(this.url+'/'+id);
  }

  updateSalida(salida:Salida):Observable<Salida>{
    return this.http.put<Salida>(this.url+'/update/'+salida.id, salida);
  }

  deleteSalida(id:number):Observable<any>{
    return this.http.delete<any>(this.url+'/delete/'+id);
  }
}
