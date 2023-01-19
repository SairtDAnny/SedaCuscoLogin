import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListarporDni } from 'src/app/models/ListarporDni';
import { Salida } from 'src/app/models/salida';
import { DataService } from 'src/app/services/data.service';
import { SalidaService } from 'src/app/services/salida.service';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {

  salidas: Salida[] = [];

  sal : ListarporDni[] =[];

  subRef$: Subscription;

  constructor(
    private salService : SalidaService, 
    private dataService:DataService,
    private router:Router
    ) { } 

  filterSalida = '';

  ngOnInit(): void {
   //listar COLABORADOR
  const url = 'http://localhost:8080/api/salida/list';
  this.subRef$ = this.dataService.get<Salida[]>(url)
  .subscribe(res => {
    this.salidas = res.body;
  },
  err => {
    console.log('error al recuperar los entregas', err);
  });
  }
  deteleSalida(id : number){
    const url = 'http://localhost:8080/api/salida/delete/';
    this.subRef$=this.dataService.delete<Salida>(url+id)
    .subscribe(response =>{
      this.salidas = this.salidas.filter(sal=>sal.id !=id);
    })
  }
}