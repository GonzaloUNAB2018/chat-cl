import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the AngularFireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AngularFireProvider {

  constructor(
    public http: HttpClient,
    private afDb: AngularFireDatabase
    ) {
    console.log('Hello AngularFireProvider Provider');
  }

  public createNewUser(uid, user){
    this.afDb.database.ref('Users/'+uid+'/Data').set(user);
  }

  public editUserData(uid, user){
    this.afDb.database.ref('Users/'+uid+'/Data').update(user);
  }

  public getUserData(uid){
    return this.afDb.object('Users/'+uid+'/Data')
  }

  public getContactsList(){
    return this.afDb.list('Users/');
  }

}
