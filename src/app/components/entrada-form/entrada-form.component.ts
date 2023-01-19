import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrada } from 'src/app/models/entrada';
import { Patrimonio } from 'src/app/models/patrimonio';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.css']
})
export class EntradaFormComponent {

  entrada : Entrada = new Entrada();

  patrimonios: Patrimonio[]=[];

  constructor(private entService : EntradaService, private activatedRoute: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
      this.entService.getPatrimonio()
      .subscribe(response => this.patrimonios = response)
      this.activatedRoute.params
      .subscribe(params => {
        let id: number = params['id'];
        if(id){
          this.entService.listIdEntrada(id)
          .subscribe(response => this.entrada = response);
        }
      })
  } 

  insertEntrada( ){
    console.log(this.entrada)
    this.entService.insertEntrada(this.entrada)
    .subscribe(response => this.router.navigate(['entrada']));
  }

  updateEntrada(){
    this.entService.updateEntrada(this.entrada)
    .subscribe(response => this.router.navigate(['entrada']));
  }

  compararNivel(o1: Entrada, o2:Entrada): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }

}