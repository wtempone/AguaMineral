import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { Distribuidor } from '../database-providers';

@Injectable()
export class DistribuidorService {
  private basePath: string = '/distribuidores';
  public distribuidores: FirebaseListObservable<Distribuidor[]> = null; //  list of objects
  public distribuidor: FirebaseObjectObservable<Distribuidor> = null; //   single object
  constructor(private db: AngularFireDatabase) { 
    this.distribuidores = this.db.list(this.basePath);
  }

  getList(query = {}): FirebaseListObservable<Distribuidor[]> {
    this.distribuidores = this.db.list(this.basePath, { query: query });
    return this.distribuidores;
  }

  get(key: string): FirebaseObjectObservable<Distribuidor> {
    const itemPath = `${this.basePath}/${key}`;
    this.distribuidor = this.db.object(itemPath)
    return this.distribuidor
  } 

  getOnce(field: string, value: string)  {
    return this.db.list(this.basePath).$ref.orderByChild(field).equalTo(value).limitToFirst(1).once('value');
  }
  
  create(Distribuidor: Distribuidor) {
    return this.distribuidores.push(Distribuidor);
  }

  update(key: string, value: any) {
    return this.distribuidores.update(key, value);
  }

  delete(key: string): void {
    this.distribuidores.remove(key)
      .catch(error => this.handleError(error))
  }

  deleteAll(): void {
    this.distribuidores.remove()
      .catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.log(error)
  }
}