import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ChatRoomDashboardComponent } from './chat-room-dashboard/chat-room-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: ChatRoomDashboardComponent,
  },
  {
    path: 'chat-room/:uuid',
    component: ChatRoomComponent,
  },
];

@NgModule({
  declarations: [ChatRoomComponent, ChatRoomDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, TranslateModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule, MatInputModule],
})
export class ChatRoomModule {}
