import { Injectable, signal, WritableSignal } from '@angular/core';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';
import { IperfilId} from '../interfaces/iperfil-id';

const DB_perfiles = "MyPerfiles";


@Injectable({
  providedIn: 'root'
})




export class BaseService {

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private perfil: WritableSignal<IperfilId[]> = signal(<IperfilId[]>[]);

  constructor() { }

  async initializeDatabase() {
    this.db = await this.sqlite.createConnection(
      DB_perfiles,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    const schema = `
      CREATE TABLE IF NOT EXISTS perfiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mail TEXT UNIQUE,
        pass TEXT,
        nombre TEXT,
        apellido TEXT,
        apodo TEXT,
        edad INTEGER,
      );`;


     await this.db.execute(schema);
     this.loadPerfiles();
     return true; 
}
  async loadPerfiles(){
    const perfiles = await this.db.query('SELECT * FROM perfiles');
    this.perfil.set(perfiles.values || []);
  }

  async createUser(perfil: any) {
    const query = `
      INSERT INTO perfiles (mail, pass, nombre, apellido, apodo, edad)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [perfil.mail, perfil.pass, perfil.nombre, perfil.apellido, perfil.apodo, perfil.edad];
    return this.db.query(query, values);
  }

  async deletePerfiles(){
    const query = 'DROP TABLE IF EXISTS users';
    await this.db.execute(query);
   
  }

  async getPerfiles() {
    return this.perfil;
  }
}