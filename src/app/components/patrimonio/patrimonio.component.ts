import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patrimonio } from 'src/app/models/patrimonio';
import { DataService } from 'src/app/services/data.service';
import { PatrimonioService } from 'src/app/services/patrimonio.service';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.css']
})
export class PatrimonioComponent implements OnInit{
  patrimonios : Patrimonio[] = [];
  subRef$: Subscription;
  constructor(
    private PatService : PatrimonioService,
    private dataService:DataService,
    private router:Router
    ){}

  ngOnInit(): void {
       //listar PATRIMONIO
  const url = 'http://localhost:8080/api/patrimonio/list';
  this.subRef$ = this.dataService.get<Patrimonio[]>(url)
  .subscribe(res => {
    this.patrimonios = res.body;
  },
  err => {
    console.log('error al recuperar EPP', err);
  });
  }


  //eliminar el patrimonio
  deletePatrimonio(id : number){
    const url = 'http://localhost:8080/api/patrimonio/delete/';
    this.subRef$=this.dataService.delete<Patrimonio>(url+id)
    .subscribe(response =>{
      this.patrimonios = this.patrimonios.filter(patri=>patri.id !=id);
    })
  }
  ngOnDestroy(): void {
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }

}
 