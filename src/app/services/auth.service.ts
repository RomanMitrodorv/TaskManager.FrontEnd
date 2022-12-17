import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenRequest } from '../models/TokenRequest';
import { TokenResponse } from '../models/TokenResponse';
import { environment } from '../../environments/environment';

const AUTH_API = environment.IdentityApiUrl + 'connect/token';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  token(tokenRequest: TokenRequest): Observable<TokenResponse> {
    let body = new URLSearchParams();

    body.set('client_id', tokenRequest.client_id);
    body.set('scope', tokenRequest.scope);
    body.set('grant_type', tokenRequest.grant_type);
    body.set('username', tokenRequest.username);
    body.set('password', tokenRequest.password);

    return this.http.post<TokenResponse>(
      AUTH_API,
      body.toString(),
      httpOptions
    );
  }
}
