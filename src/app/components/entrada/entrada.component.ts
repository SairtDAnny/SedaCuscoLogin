import { Component, OnInit} from '@angular/core';
import { Entrada } from 'src/app/models/entrada';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit{

  entradas: Entrada[] = [];

  constructor(private entService : EntradaService) { }

  ngOnInit(): void {
      this.entService.getEntrada()
      .subscribe(response => this.entradas = response);
  }

  deleteEntrada(id : number){
    this.entService.deleteEntrada(id)
    .subscribe(response =>{
      this.entradas = this.entradas.filter(entra=>entra.id !=id);
    })
  }
}