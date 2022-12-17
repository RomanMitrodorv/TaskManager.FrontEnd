import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenResponse } from '../models/TokenResponse';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private router: Router) {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveToken(user: TokenResponse): void {
    window.sessionStorage.removeItem(USER_KEY);
    const now = new Date();

    const item = {
      value: user.token_type + ' ' + user.access_token,
      expiry: now.getTime() + user.expires_in * 1000,
    };

    window.sessionStorage.setItem(USER_KEY, JSON.stringify(item));
  }

  public getToken() {
    const itemStr = window.sessionStorage.getItem(USER_KEY);
    if (!itemStr) {
      return;
    }
    const item = JSON.parse(itemStr);

    const now = new Date();
    if (now.getTime() > item.expiry) {
      window.sessionStorage.removeItem(USER_KEY);
      return;
    }
    return item.value;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
