import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, Observable } from 'rxjs';
import { Iperfil } from './interfaces/iperfil';
import { environment } from 'src/environments/environment';
import { IperfilId } from './interfaces/iperfil-id';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  }


constructor(private httpClient: HttpClient) { }

private apiUrl = 'http://localhost:3000'; 

  // obtener informacion
  listarPerfil():Observable<Iperfil> {
    return this.httpClient.get<Iperfil>(`${environment.apiURL}/perfiles`)
}

  // agregar informacion
  crearPerfil(newPerfil:IperfilId):Observable<IperfilId> {
    return this.httpClient.post<IperfilId>(`${environment.apiURL}/perfiles`, newPerfil)
}

  // obtener segun id valores unicos
  getPerfilbyID(id: number):Observable<Iperfil> {
    return this.httpClient.get<Iperfil>(`${environment.apiURL}/perfiles/?id=${id}`)
}

  login(email: string, password: string) {
  return this.httpClient.get<Iperfil[]>(`${environment.apiURL}/perfiles?mail=${email}&pass=${password}`);
}

  // eleminar informacion
  deleteData(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/data/${id}`)
  }
}