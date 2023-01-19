import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Colaborador } from 'src/app/models/colaborador';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})

export class ColaboradorComponent implements OnInit, OnDestroy{

  colaboradores: Colaborador[] = [];
  subRef$: Subscription;

  constructor(
    private colService : ColaboradorService, 
    private dataService:DataService,
    private router:Router) { }

  ngOnInit(): void {
    //listar COLABORADOR
  const url = 'http://localhost:8080/api/colaborador/list';
  this.subRef$ = this.dataService.get<Colaborador[]>(url)
  .subscribe(res => {
    this.colaboradores = res.body;
  },
  err => {
    console.log('error al recuperar los colaboradores', err);
  });
  }

  eliminarColaborador(id : string){
    const url = 'http://localhost:8080/api/colaborador/delete/';
    this.subRef$=this.dataService.delete<Colaborador>(url+id)
    .subscribe(response =>{
      this.colaboradores = this.colaboradores.filter(cola=>cola.id !=id);
    })
  }

  /*eliminarProduct(id : string){
    this.colService.eliminarColaborador(id)
    .subscribe(response =>{
      this.colaboradores = this.colaboradores.filter(cola=>cola.id !=id);
    })
  }*/
  ngOnDestroy(): void {
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }

}
 