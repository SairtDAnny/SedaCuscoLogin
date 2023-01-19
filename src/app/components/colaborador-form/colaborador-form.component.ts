import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Colaborador } from 'src/app/models/colaborador';
import { Oficina } from 'src/app/models/oficina';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-colaborador-form',
  templateUrl: './colaborador-form.component.html',
  styleUrls: ['./colaborador-form.component.css']
})



export class ColaboradorFormComponent implements OnInit,OnDestroy{

  colaborador : Colaborador = new Colaborador();

  oficinas: Oficina[]=[];
  subRef$: Subscription;

  constructor(private colService : ColaboradorService, private activatedRoute: ActivatedRoute, private router:Router, private dataService:DataService) {}

  ngOnInit(): void {
    const url = 'http://localhost:8080/api/oficina/list';
    this.subRef$ = this.dataService.get<Oficina[]>(url)
    .subscribe(res => {
      this.oficinas = res.body;
    },
    err => {
      console.log('error al recuperar oficinas', err);
    });
     
      this.activatedRoute.params
      .subscribe(params => {
        let id: string = params['id'];
        console.log("es: "+id);
        if(id){
          this.colService.obtenerColaborador(id)
          .subscribe(response => this.colaborador = response);
        }
      })
  } 

  insertColaboradr( ){
    console.log(this.colaborador)
    this.colService.insertColaborador(this.colaborador)
    .subscribe(response => this.router.navigate(['']));
  }

  insertColaborador(){
  const url = 'http://localhost:8080/api/colaborador/insert';
  this.subRef$=this.dataService.post<Colaborador>(url,this.colaborador)
  .subscribe(res => this.router.navigate(['colaborador']))
}


  actualizarColaborador(){
    this.colService.actualizarColaborador(this.colaborador)
    .subscribe(response => this.router.navigate(['']));
  }

  compararNivelCol(o1: Colaborador, o2:Colaborador): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }

  ngOnDestroy(): void {
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }
}