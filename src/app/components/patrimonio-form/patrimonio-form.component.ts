import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patrimonio } from 'src/app/models/patrimonio';
import { PatrimonioService } from 'src/app/services/patrimonio.service';

@Component({
  selector: 'app-patrimonio-form',
  templateUrl: './patrimonio-form.component.html',
  styleUrls: ['./patrimonio-form.component.css']
})
export class PatrimonioFormComponent implements OnInit{

  patrimonio : Patrimonio = new Patrimonio();


  constructor(private patService : PatrimonioService, private activatedRoute: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(params => {
      let id: number = params['id'];
      console.log("es: "+id);
      if(id){
        this.patService.listPatrimonio(id)
        .subscribe(response => this.patrimonio = response);
      }
    })
} 

insertPatrimonio( ){
    console.log(this.patrimonio)
    this.patService.insertPatrimonio(this.patrimonio)
    .subscribe(response => this.router.navigate(['patrimonio']));
  }

  updatePatrimonio(){
    this.patService.updatePatrimonio(this.patrimonio)
    .subscribe(response => this.router.navigate(['patrimonio']));
  }
  compararMedidaPat(o1: Patrimonio, o2:Patrimonio): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }


}
 