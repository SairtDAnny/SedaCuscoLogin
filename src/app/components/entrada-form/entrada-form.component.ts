import { Component,OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Entrada } from 'src/app/models/entrada';
import { Patrimonio } from 'src/app/models/patrimonio';
import { DataService } from 'src/app/services/data.service';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.css']
})
export class EntradaFormComponent  implements OnInit,OnDestroy{

  entrada : Entrada = new Entrada();
  subRef$: Subscription;

  patrimonios: Patrimonio[]=[];

  constructor(
    private entService : EntradaService, 
    private activatedRoute: ActivatedRoute, 
    private router:Router, 
    private dataService:DataService) {}

  ngOnInit(): void {
    const url = 'http://localhost:8080/api/patrimonio/list';
    this.subRef$ = this.dataService.get<Patrimonio[]>(url)
    .subscribe(res => {
      this.patrimonios = res.body;
    },
    err => {
      console.log('error al recuperar EPP', err);
    });

      this.activatedRoute.params
      .subscribe(params => {
        let id: number = params['id'];
        if(id){
          this.obtenerEntrada(id);
        }
      })
  } 
  obtenerEntrada(id:number){
    const url = 'http://localhost:8080/api/entrada/';
          this.subRef$ = this.dataService.get<Entrada>(url+id)
          .subscribe(res => {
            this.entrada = res.body;
          },
          err => {
            console.log('error al recuperar EPP', err);
            console.log(id);
            
          });
  }
  

  insertEntrada(entrada : Entrada ){
    const url = 'http://localhost:8080/api/entrada/insert';
    this.subRef$=this.dataService.post<Entrada>(url,this.entrada)
    .subscribe(res => this.router.navigate(['entrada']))
  }

  updateEntrada(id: number){
    const url = 'http://localhost:8080/api/entrada/update/';
    this.subRef$=this.dataService.put<Entrada>(url+id,this.entrada)
    .subscribe(res => this.router.navigate(['entrada']))
  }

  compararNivel(o1: Entrada, o2:Entrada): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }
  ngOnDestroy(): void {
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }

}