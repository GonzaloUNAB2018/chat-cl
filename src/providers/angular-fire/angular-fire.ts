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

  new_chat = {
    id : null,
    id_other : null,
    messages : {

    }
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
    //this.afDb.database.ref('Chats/'+user.id).set(this.chat);
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

  public getChat(chat_id){
    return this.afDb.list('Chats/'+chat_id+'/Messages');
  }

  public getChatData(chat_id){
    return this.afDb.object('Chats/'+chat_id+'/data')
  }
  
  public createChatRoom(chat_data){
    this.afDb.database.ref('Chats/'+chat_data.data.id).set(chat_data);
  }

  public newMessage(chat_id, message){
    this.afDb.database.ref('Chats/'+chat_id+'/messages/'+message.id).set(message)
  }

  public getMessages(chat_id){
    return this.afDb.list('Chats/'+chat_id+'/messages/');
  }

}
