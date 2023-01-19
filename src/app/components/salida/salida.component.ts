import { Component, OnInit} from '@angular/core';
import { ListarporDni } from 'src/app/models/ListarporDni';
import { Salida } from 'src/app/models/salida';
import { SalidaService } from 'src/app/services/salida.service';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {

  salidas: Salida[] = [];

  sal : ListarporDni[] =[];

  constructor(private salService : SalidaService) { } 

  filterSalida = '';

  ngOnInit(): void {
      this.salService.getSalida()
      .subscribe(response => this.salidas = response);
  }

  deteleSalida(id : number){
    this.salService.deleteSalida(id)
    .subscribe(response =>{
      this.salidas = this.salidas.filter(sali=>sali.id !=id);
    })
  }
}