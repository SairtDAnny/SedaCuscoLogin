import { Component, OnInit } from '@angular/core';
import { Patrimonio } from 'src/app/models/patrimonio';
import { PatrimonioService } from 'src/app/services/patrimonio.service';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.css']
})
export class PatrimonioComponent implements OnInit{
  patrimonios : Patrimonio[] = [];

  constructor(private PatService : PatrimonioService){}

  ngOnInit(): void {
      //listar patrimonio
      this.PatService.getPatrimonio()
      .subscribe(response => this.patrimonios = response);
  }

  //eliminar el patrimonio
  deletePatrimonio(id : number){
    this.PatService.deletePatrimonio(id)
    .subscribe(response => {
      this.patrimonios = this.patrimonios.filter(patri => patri.id !=id);
    })
  }

}
 