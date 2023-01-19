import { Component , OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnDestroy {

  IsAuthenticated= false;
  
  title = 'LoginControlEpp';
  private subAuth$: Subscription = new Subscription;

  constructor(
    private securotyService: SecurityService
  ){
    this.IsAuthenticated = this.securotyService.IsAuthorized;

    this.subAuth$ = this.securotyService.authChallenge$.subscribe(
      (isAuth) => {
        this.IsAuthenticated = isAuth;
      });
    
  }

  ngOnDestroy(): void {
    if(this.subAuth$){
      this.subAuth$.unsubscribe();
    }
  }
}
