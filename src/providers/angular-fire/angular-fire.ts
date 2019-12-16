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

  chat = {
    id : null,
    description : 'Chats con los diferentes usuarios.'
  }

  constructor(
    public http: HttpClient,
    private afDb: AngularFireDatabase
    ) {
    console.log('Hello AngularFireProvider Provider');
  }

  public createNewUser(uid, user){
    this.chat.id = Date.now();
    this.afDb.database.ref('Users/'+uid+'/Data').set(user);
    this.afDb.database.ref('Users/'+uid+'/Chats').set(this.chat);
    this.afDb.database.ref('Chats/'+user.id).set(this.chat);
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

  public createNewChat(chat, user, other_user){
    this.afDb.database.ref('Chats/'+chat.id).set(chat);
    this.afDb.database.ref('Users/'+user.uid+'/Chat').update(user);
    this.afDb.database.ref('Users/'+other_user.uid+'/Chat').update(other_user);
  }

}
