import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Entrada } from 'src/app/models/entrada';
import { DataService } from 'src/app/services/data.service';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit, OnDestroy{

  entradas: Entrada[] = [];
  subRef$: Subscription;

  constructor(private entService : EntradaService, private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
       //listar ENTRADA
  const url = 'http://localhost:8080/api/entrada/list';
  this.subRef$ = this.dataService.get<Entrada[]>(url)
  .subscribe(res => {
    this.entradas = res.body;
  },
  err => {
    console.log('error al recuperar los datos de ingreso', err);
  });
  }

  deleteEntrada(id : number){
    const url = 'http://localhost:8080/api/entrada/delete/';
    this.subRef$=this.dataService.delete<Entrada>(url+id)
    .subscribe(response =>{
      this.entradas = this.entradas.filter(ent=>ent.id !=id);
    })
  }

  ngOnDestroy(): void {
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }
  }
