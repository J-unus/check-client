import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChatRoomService} from "../chat-room.service";

@Component({
  selector: 'checkpoint-chat-room-dashboard',
  templateUrl: 'chat-room-dashboard.component.html'
})
export class ChatRoomDashboardComponent implements OnInit {
  uuid: string;
  password: string;

  constructor(private chatRoomService: ChatRoomService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  createChatRoom(): void {
    if (!this.password) {
      return;
    }
    this.chatRoomService.create(this.password).subscribe(response => {
      this.router.navigate(['chat-room', response.uuid], {
        relativeTo: this.activatedRoute,
      });
    });
  }

  joinChatRoom(): void {
    if (!this.uuid) {
      return;
    }
    this.chatRoomService.authorize(this.uuid, this.password).subscribe(() => {
      this.router.navigate(['chat-room', this.uuid], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
