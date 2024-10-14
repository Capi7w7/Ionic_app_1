import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  private db!: SQLiteObject;
  
  constructor() { }
  
  setDatabase(db: SQLiteObject) {
    if (!this.db) {
      this.db = db;
    }
  }
 
  createTables(): Promise<any> {
    let tables = `
  CREATE TABLE IF NOT EXISTS sesion_data
  (
    id TEXT(4) PRIMARY KEY NOT NULL,
    mail TEXT NOT NULL,
    pass TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    apodo TEXT NOT NULL,
    edad INTEGER NOT NULL,
    img_perf TEXT,
  );
  CREATE TABLE IF NOT EXISTS pending_sync
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL
  );`;
    return this.db.executeSql(tables);
  }
  /**
   * Retorna si existe un usuario activo o no.
   */
  sesionActive() {
    // Se desarrolla la consulta
    let sql = `SELECT nombre,active FROM sesion_data WHERE active=1 LIMIT 1`;
    // Se ejecuta la consulta y no le pasamos parametros [value,value1,...]
    return this.db.executeSql(sql, [])
    // Cuando se ejecute la consulta
    .then(response => { // obtenemos lo que devuelve la consulta
      return Promise.resolve(response.rows.item(0)); // Se obtiene el primer item de la consulta y se retorna
    });
  }
  /**
   * Función que valida la existencia del usuario que esta iniciando sesión
   * @param sesion Datos de inicio de sesión Usuario y Password
   */
  getSesionData(sesion: any) {
    let sql = `SELECT user_name, active FROM sesion_data
    WHERE user_name=? AND password=? LIMIT 1`;
    return this.db.executeSql(sql, [sesion.Usuario,
      sesion.Password]).then(response => {
        return Promise.resolve(response.rows.item(0));
      });
  }
  /**
   * Función que crea un nuevo registro de inicio de sesión
   * @param sesion Datos de inicio de sesión Usuario, Password y Active
   */
  async createSesionData(sesion: any) {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    const randomId = this.generateRandomId();
    let sql = `INSERT INTO sesion_data(id, mail, pass, nombre, apellido, apodo, edad, active)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
    return this.db.executeSql(sql, [randomId, sesion.mail, 
      sesion.pass, sesion.nombre, sesion.apellido, sesion.apodo, sesion.edad, sesion.active]);
  }

  private generateRandomId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  storePendingSyncData(data: any): Promise<any> {
    let sql = `INSERT INTO pending_sync (data) VALUES (?)`;
    return this.db.executeSql(sql, [JSON.stringify(data)]);
  }

  clearSesionData(): Promise<any> {
    let sql = `DELETE FROM sesion_data`;
    return this.db.executeSql(sql, []);
  }

  getPendingSyncData(): Promise<any[]> {
    let sql = `SELECT * FROM pending_sync`;
    return this.db.executeSql(sql, []).then(response => {
      let pendingData = [];
      for (let i = 0; i < response.rows.length; i++) {
        pendingData.push(response.rows.item(i));
      }
      return Promise.resolve(pendingData);
    });
  }
  
  removePendingSyncData(id: number): Promise<any> {
    let sql = `DELETE FROM pending_sync WHERE id = ?`;
    return this.db.executeSql(sql, [id]);
  }
 
}