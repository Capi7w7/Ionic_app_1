import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, switchMap,map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Iperfil } from './interfaces/iperfil';

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


private apiUrl = 'https://67196caa7fc4c5ff8f4d6fd2.mockapi.io/api';

  // obtener informacion
  listarPerfil():Observable<Iperfil[]> {
    return this.httpClient.get<Iperfil[]>(`${this.apiUrl}/perfiles`)
}

  // agregar informacion
  crearPerfil(newPerfil:IperfilId):Observable<IperfilId> {
    return this.httpClient.post<IperfilId>(`${this.apiUrl}/perfiles`, newPerfil)
}

  // obtener segun id valores unicos
  getPerfilbyID(id: string):Observable<Iperfil> {
    return this.httpClient.get<Iperfil>(`${this.apiUrl}/perfiles/?id=${id}`)
}

login(email: string, password: string) {
  return this.httpClient.get<Iperfil[]>(`${this.apiUrl}/perfiles`).pipe(
    map(users => users.filter(user => 
      user.mail === email && user.pass === password
    ))
  );
}

  obtenerPorMail(email: string) {
  return this.httpClient.get<Iperfil[]>(`${this.apiUrl}/perfiles?mail=${email}`);
}

  actualizarPassword(id: string, newPassword: string): Observable<Iperfil> {
  return this.httpClient.get<Iperfil>(`${this.apiUrl}/perfiles/${id}`).pipe(
    switchMap(user => {
      const updatedUser = { ...user, pass: newPassword };
      return this.httpClient.put<Iperfil>(`${this.apiUrl}/perfiles/${id}`, updatedUser);
    })
  );
}

actualizarImg(id: string, newImg: string): Observable<Iperfil> {
  return this.httpClient.get<Iperfil>(`${this.apiUrl}/perfiles/${id}`).pipe(
    switchMap(user => {
      const updatedUser = { ...user, img_perf: newImg };
      return this.httpClient.put<Iperfil>(`${this.apiUrl}/perfiles/${id}`, updatedUser);
    })
  );
}

actualizarPerfil(id: string, userData: any): Observable<Iperfil> {
  return this.httpClient.get<Iperfil>(`${this.apiUrl}/perfiles/${id}`).pipe(
    switchMap(currentUser => {
      const updatedUser = { 
        ...currentUser,
        nombre: userData.nombre,
        apellido: userData.apellido, 
        apodo: userData.apodo,
        telefono: userData.telefono,
        carrera: userData.carrera,
        mail: userData.email,
      };
      return this.httpClient.put<Iperfil>(`${this.apiUrl}/perfiles/${id}`, updatedUser);
    })
  );
}

  // eleminar informacion
  deleteData(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/perfiles/${id}`)
  }


  //metodos de endpoint a empremdimiento

  addEmprendimiento(data:any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/Emprendimiento`, data)
  }

  getEmprendimientos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/Emprendimiento`);
  }

}