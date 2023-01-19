import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Colaborador } from 'src/app/models/colaborador';
import { Patrimonio } from 'src/app/models/patrimonio';
import { Salida } from 'src/app/models/salida';
import { SalidaService } from 'src/app/services/salida.service';

@Component({
  selector: 'app-salida-form',
  templateUrl: './salida-form.component.html',
  styleUrls: ['./salida-form.component.css']
})
export class SalidaFormComponent {

  salida : Salida = new Salida();

  patrimonios : Patrimonio[]=[];
  colaboradores : Colaborador[]=[];

  constructor(private salService : SalidaService, private activatedRoute: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
      this.salService.getPatrimonio()
      .subscribe(response => this.patrimonios = response)

      

      this.salService.getColaborador()
      .subscribe(response => this.colaboradores = response)


      this.activatedRoute.params
      .subscribe(params => {
        let id: number = params['id'];
        if(id){
          this.salService.listIdSalida(id)
          .subscribe(response => this.salida = response);
        }
      })
  } 

  insertSalida( ){
    console.log(this.salida)
    this.salService.insertSalida(this.salida)
    .subscribe(response => this.router.navigate(['salida']));
  }

  updateSalida(){
    this.salService.updateSalida(this.salida)
    .subscribe(response => this.router.navigate(['salida']));
  }

  compararNivel(o1 : Salida, o2 : Salida) : boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }

}