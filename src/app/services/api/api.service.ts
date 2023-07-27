import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private authServerUrl = 'https://auth-server.igamalab.cl/oauth2/token';
  private apiServerUrl = 'https://fhir-server.igamalab.cl/fhir/';

  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<ResponseI> {
    const data = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('scope', 'openid');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`grupo11:TcROxGwy14`)}`,
    });

    return this.http.post<ResponseI>(this.authServerUrl, data.toString(), {
      headers,
      responseType: 'json',
    });
  }

  getUserData(form: LoginI): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((response) => {
        const accessToken = response.access_token;
        console.log(accessToken);

        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        });

        const searchParams = new HttpParams().set('identifier', form.run);

        return this.http.get<any>(this.apiServerUrl + 'Patient', {
          headers,
          params: searchParams,
          responseType: 'json',
        });
      })
    );
  }
}
