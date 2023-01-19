import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Colaborador } from 'src/app/models/colaborador';
import { Patrimonio } from 'src/app/models/patrimonio';
import { Salida } from 'src/app/models/salida';
import { DataService } from 'src/app/services/data.service';
import { SalidaService } from 'src/app/services/salida.service';

@Component({
  selector: 'app-salida-form',
  templateUrl: './salida-form.component.html',
  styleUrls: ['./salida-form.component.css']
})
export class SalidaFormComponent implements OnInit,OnDestroy {

  salida : Salida = new Salida();

  patrimonios : Patrimonio[]=[];
  colaboradores : Colaborador[]=[];
  subRef$: Subscription;

  constructor(
    private salService : SalidaService,
     private activatedRoute: ActivatedRoute, 
     private router:Router,
     private dataService:DataService
     ) {}

  ngOnInit(): void {
    const url = 'http://localhost:8080/api/patrimonio/list';
    this.subRef$ = this.dataService.get<Patrimonio[]>(url)
    .subscribe(res => {
      this.patrimonios = res.body;
    },
    err => {
      console.log('error al recuperar oficinas', err);
    });

      

    const url2 = 'http://localhost:8080/api/colaborador/list';
    this.subRef$ = this.dataService.get<Colaborador[]>(url2)
    .subscribe(res => {
      this.colaboradores = res.body;
    },
    err => {
      console.log('error al recuperar oficinas', err);
    });



      this.activatedRoute.params
      .subscribe(params => {
        let id: number = params['id'];
        if(id){
          this.obtenerSalida(id);
        }
      })
  } 
  obtenerSalida(id:number){
    const url = 'http://localhost:8080/api/salida/';
          this.subRef$ = this.dataService.get<Salida>(url+id)
          .subscribe(res => {
            this.salida = res.body;
          },
          err => {
            console.log('error al recuperar entregas', err);
            console.log(id);
            
          });
  }

  insertSalida( salida: Salida){
    const url = 'http://localhost:8080/api/salida/insert';
    this.subRef$=this.dataService.post<Salida>(url,this.salida)
    .subscribe(res => this.router.navigate(['salida']))
  }

  updateSalida(id: number){
    const url = 'http://localhost:8080/api/salida/update/';
    this.subRef$=this.dataService.put<Salida>(url+id,this.salida)
    .subscribe(res => this.router.navigate(['salida']))
  }

  compararNivel(o1 : Salida, o2 : Salida) : boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }
  ngOnDestroy(): void {
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }
}