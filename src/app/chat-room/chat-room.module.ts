import {RouterModule, Routes} from "@angular/router";
import {ChatRoomComponent} from "./chat-room.component";
import {MessageComponent} from "./message/message.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  {
    path: '',
    component: ChatRoomComponent,
  },
  {
    path: 'chat-room/:uuid',
    component: MessageComponent,
  }
];

@NgModule({
  declarations: [
    ChatRoomComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TranslateModule,
  ]
})
export class ChatRoomModule {
}
