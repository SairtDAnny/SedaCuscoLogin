import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  IsAuthorized:any;

  private authSource = new Subject<boolean>();
  authChallenge$ = this.authSource.asObservable();

  constructor(
    private storeService: StorageService
  ) { 
    if(storeService.retrieve('IsAuthorized') !== ''){
      this.IsAuthorized = this.storeService.retrieve('IsAuthorized');
      this.authSource.next(this.IsAuthorized);
    }
  }
  public GetToken():any{
    return this.storeService.retrieve('authData');
  }

  public ResetAuthData(){
    this.storeService.store('authData', '');
    this.IsAuthorized = false;
    this.storeService.store('IsAuthorized', false);
  }

  public SetAuthData(token: any){
    this.storeService.store('authData', token);
    this.IsAuthorized = true;
    this.storeService.store('IsAuthorized', true);
    this.authSource.next(true);
  }

  public LogOff() {
    this.ResetAuthData();
    this.authSource.next(false);
  }

}
