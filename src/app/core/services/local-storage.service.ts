import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  getAuthenticationToken() :string | null
  {
    return localStorage.getItem("token");
  }

  setAuthenticationToken(token:string)
  {
    localStorage.setItem("token",token);
  }

}
