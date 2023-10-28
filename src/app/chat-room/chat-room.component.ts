import {Component} from '@angular/core';
import {ChatRoomService} from "./chat-room.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'checkpoint-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent {
  password: string;

  constructor(private chatRoomService: ChatRoomService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  createChatRoom(): void {
    if (!this.password) {
      return;
    }
    this.chatRoomService.create(this.password).subscribe(response => {
      this.router.navigate(['chat-room', response.link], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
