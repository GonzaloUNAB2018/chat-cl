import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaChatPage } from './pagina-chat';

@NgModule({
  declarations: [
    PaginaChatPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginaChatPage),
  ],
})
export class PaginaChatPageModule {}
