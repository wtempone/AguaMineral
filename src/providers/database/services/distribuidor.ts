import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { Distribuidor } from '../database-providers';

@Injectable()
export class DistribuidorService {
  private basePath: string = '/Distribuidores';
  public Distribuidores: FirebaseListObservable<Distribuidor[]> = null; //  list of objects
  public Distribuidor: FirebaseObjectObservable<Distribuidor> = null; //   single object
  public DistribuidorAtual: Distribuidor;
  constructor(private db: AngularFireDatabase) { 
    this.Distribuidores = this.db.list(this.basePath);
  }

  getList(query = {}): FirebaseListObservable<Distribuidor[]> {
    this.Distribuidores = this.db.list(this.basePath, { query: query });
    return this.Distribuidores;
  }

  get(key: string): FirebaseObjectObservable<Distribuidor> {
    const itemPath = `${this.basePath}/${key}`;
    this.Distribuidor = this.db.object(itemPath)
    return this.Distribuidor
  } 

  getOnce(field: string, value: string)  {
    return this.db.list(this.basePath).$ref.orderByChild(field).equalTo(value).limitToFirst(1).once('value');
  }
  
  create(Distribuidor: Distribuidor) {
    return this.Distribuidores.push(Distribuidor);
  }

  update(key: string, value: any) {
    return this.Distribuidores.update(key, value);
  }

  delete(key: string): void {
    this.Distribuidores.remove(key)
      .catch(error => this.handleError(error))
  }

  deleteAll(): void {
    this.Distribuidores.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}