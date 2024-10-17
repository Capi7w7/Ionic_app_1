import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, Observable, switchMap } from 'rxjs';
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
  listarPerfil():Observable<Iperfil[]> {
    return this.httpClient.get<Iperfil[]>(`${environment.apiURL}/perfiles`)
}

  // agregar informacion
  crearPerfil(newPerfil:IperfilId):Observable<IperfilId> {
    return this.httpClient.post<IperfilId>(`${environment.apiURL}/perfiles`, newPerfil)
}

  // obtener segun id valores unicos
  getPerfilbyID(id: string):Observable<Iperfil> {
    return this.httpClient.get<Iperfil>(`${environment.apiURL}/perfiles/?id=${id}`)
}

  login(email: string, password: string) {
  return this.httpClient.get<Iperfil[]>(`${environment.apiURL}/perfiles?mail=${email}&pass=${password}`);
} 
  obtenerPorMail(email: string) {
  return this.httpClient.get<Iperfil[]>(`${environment.apiURL}/perfiles?mail=${email}`);
}

  actualizarPassword(id: string, newPassword: string): Observable<Iperfil> {
  return this.httpClient.get<Iperfil>(`${environment.apiURL}/perfiles/${id}`).pipe(
    switchMap(user => {
      const updatedUser = { ...user, pass: newPassword };
      return this.httpClient.put<Iperfil>(`${environment.apiURL}/perfiles/${id}`, updatedUser);
    })
  );
}

actualizarImg(id: string, newImg: string): Observable<Iperfil> {
  return this.httpClient.get<Iperfil>(`${environment.apiURL}/perfiles/${id}`).pipe(
    switchMap(user => {
      const updatedUser = { ...user, img_perf: newImg };
      return this.httpClient.put<Iperfil>(`${environment.apiURL}/perfiles/${id}`, updatedUser);
    })
  );
}

  // eleminar informacion
  deleteData(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/perfiles/${id}`)
  }
}