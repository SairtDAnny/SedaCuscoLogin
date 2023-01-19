import { Component, OnInit } from '@angular/core';
import { ListarporDni } from 'src/app/models/ListarporDni';
import { Salida } from 'src/app/models/salida';
import { SalidaService } from 'src/app/services/salida.service';

@Component({
  selector: 'app-list-dni-colaborador',
  templateUrl: './list-dni-colaborador.component.html',
  styleUrls: ['./list-dni-colaborador.component.css']
})
export class ListDniColaboradorComponent implements OnInit {

  regsalida : Salida[]=[];
  

  salidasDni : ListarporDni[]=[];
  salidaDni : ListarporDni = new ListarporDni();

  constructor(private salService : SalidaService) { }

  ngOnInit(): void {
}
listDniColaborador(colaborador : String){
  this.salService.getDniSalida(colaborador)
    .subscribe(response => this.regsalida = response);
}


}
 