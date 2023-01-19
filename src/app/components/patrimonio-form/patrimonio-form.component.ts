import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patrimonio } from 'src/app/models/patrimonio';
import { DataService } from 'src/app/services/data.service';
import { PatrimonioService } from 'src/app/services/patrimonio.service';

@Component({
  selector: 'app-patrimonio-form',
  templateUrl: './patrimonio-form.component.html',
  styleUrls: ['./patrimonio-form.component.css']
})
export class PatrimonioFormComponent implements  OnInit,OnDestroy{

  patrimonio : Patrimonio = new Patrimonio();
  
  subRef$: Subscription;

  constructor(private patService : PatrimonioService,
    private activatedRoute: ActivatedRoute, 
    private router:Router, 
    private dataService:DataService) {}

  ngOnInit(): void {
      this.activatedRoute.params
      .subscribe(params => {
        let id: string = params['id'];
       
        if(id){
         /* this.colService.obtenerColaborador(id)
          .subscribe(response => this.colaborador = response);*/
          this.obtenerPatrimonio(id);
        }
      })
} 

obtenerPatrimonio(id:string){
  const url = 'http://localhost:8080/api/patrimonio/';
        this.subRef$ = this.dataService.get<Patrimonio>(url+id)
        .subscribe(res => {
          this.patrimonio = res.body;
        },
        err => {
          console.log('error al recuperar EPP', err);
          console.log(id);
          
        });
}

insertPatrimonio( patrimonio :Patrimonio){
  const url = 'http://localhost:8080/api/patrimonio/insert';
  this.subRef$=this.dataService.post<Patrimonio>(url,this.patrimonio)
  .subscribe(res => this.router.navigate(['patrimonio']))
  }

  updatePatrimonio(id : number){
    const url = 'http://localhost:8080/api/patrimonio/update/';
    this.subRef$=this.dataService.put<Patrimonio>(url,id)
    .subscribe(res => this.router.navigate(['patrimonio']))
  }
  compararMedidaPat(o1: Patrimonio, o2:Patrimonio): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }
  ngOnDestroy(): void {
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }

}
 