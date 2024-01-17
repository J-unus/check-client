import {RouterModule, Routes} from "@angular/router";
import {MessageComponent} from "./message/message.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {ChatRoomDashboardComponent} from "./chat-room-dashboard/chat-room-dashboard.component";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: '',
    component: ChatRoomDashboardComponent,
  },
  {
    path: 'chat-room/:uuid',
    component: MessageComponent,
  }
];

@NgModule({
  declarations: [
    MessageComponent,
    ChatRoomDashboardComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        TranslateModule,
        MatIconModule,
    ]
})
export class ChatRoomModule {
}
