import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ilogin } from 'src/app/models/ilogin';
import { IResponse } from 'src/app/models/iresponse';
import { DataService } from 'src/app/services/data.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  formLogin: FormGroup;
  subRef$: Subscription = new Subscription;

  constructor(
    formBiulder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private securityService: SecurityService

    ){

      this.securityService.LogOff();

      this.formLogin = formBiulder.group({
        nombreUsuario: ['', Validators.required] ,
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    
  }

  Login(){
    const usuarioLogin: Ilogin={
      nombreUsuario: this.formLogin.value.nombreUsuario,
      password: this.formLogin.value.password,
    };
    
    const url='http://localhost:8080/auth/login';
    this.subRef$ = this.dataService.post<IResponse>(url,
    usuarioLogin).
    subscribe(res => {
      const tokenResponse = res.body.token;
      console.log('token: ', tokenResponse);
      this.securityService.SetAuthData(tokenResponse);
      this.router.navigate(['/home']);
    },err => {console.log('Error en el login', err)});
  }

  ngOnDestroy(): void {
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }

}
