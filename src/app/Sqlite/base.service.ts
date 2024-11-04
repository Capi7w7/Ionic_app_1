import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public database!: SQLiteObject;
  
  constructor(public sqlite: SQLite) {
    this.initializeDatabase();
  }

   async initializeDatabase() {
    try {
      this.database = await this.sqlite.create({
        name: 'mi_plaza.db',
        location: 'default'
      });
      await this.createTables();
    } catch (error) {
      console.error('Error initializing database', error);
    }
  }

async getUsers() {
  const data = await this.database.executeSql('SELECT * FROM users', []);
  if (data.rows.length > 0) {
    return data.rows.item(0);
  } else {
    return null;
  }
}

  private async createTables() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mail TEXT UNIQUE,
        pass TEXT,
        nombre TEXT,
        apellido TEXT,
        apodo TEXT,
        edad INTEGER,
        img_perf TEXT
      )
    `;
    await this.database.executeSql(query, []);
  }

  async dropUserTable() {
    const query = 'DROP TABLE IF EXISTS users';
    return await this.database.executeSql(query)	
  }



  async createUser(user: any) {
    const query = `
      INSERT INTO users (mail, pass, nombre, apellido, apodo, edad, img_perf)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [user.mail, user.pass, user.nombre, user.apellido, user.apodo, user.edad, user.img_perf];
    return this.database.executeSql(query, values);
  }

  async getUserByEmailandPass(email: string, password: string) {
    const query = 'SELECT * FROM users WHERE mail = ? pass=?';
    const result = await this.database.executeSql(query, [email,password]);
    return result.rows.item(0);
  }
}