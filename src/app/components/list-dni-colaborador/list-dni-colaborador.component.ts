import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListarporDni } from 'src/app/models/ListarporDni';
import { Salida } from 'src/app/models/salida';
import { DataService } from 'src/app/services/data.service';
import { SalidaService } from 'src/app/services/salida.service';

@Component({
  selector: 'app-list-dni-colaborador',
  templateUrl: './list-dni-colaborador.component.html',
  styleUrls: ['./list-dni-colaborador.component.css']
})
export class ListDniColaboradorComponent implements OnInit {

  regsalida : Salida[]=[];

  subRef$: Subscription;
  

  salidasDni : ListarporDni[]=[];
  salidaDni : ListarporDni = new ListarporDni()
  

  constructor(private salService : SalidaService,
    private activatedRoute: ActivatedRoute, 
    private router:Router, 
    private dataService:DataService) { }

  ngOnInit(): void {
}
listDniColaborador(colaborador : String){
  

    const url = 'http://localhost:8080/api/salida/dni/';
    this.subRef$ = this.dataService.get<Salida[]>(url+colaborador)
    .subscribe(res => {
      this.regsalida = res.body;
    },
    err => {
      console.log('error al recuperar colaborador', err);
      console.log(colaborador);
      
    });



}


}
 