import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoomService } from '../chat-room.service';
import SessionStorageUtil from '../../shared/util/session-storage.util';
import { NotificationService } from '../../core/service/notification.service';
import { first } from 'rxjs';

export enum ViewEnum {
  CHOOSE = 'choose',
  CREATE = 'create',
  JOIN = 'join',
}

@Component({
  selector: 'checkpoint-chat-room-dashboard',
  templateUrl: 'chat-room-dashboard.component.html',
})
export class ChatRoomDashboardComponent implements OnInit {
  protected readonly ViewEnum = ViewEnum;
  uuid: string;
  password: string;
  view: ViewEnum = ViewEnum.CHOOSE;

  constructor(
    private chatRoomService: ChatRoomService,
    private router: Router,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      const uuid = params['uuid'];
      if (uuid) {
        this.uuid = uuid;
        this.view = ViewEnum.JOIN;
      }
    });
  }

  createChatRoom(): void {
    if (!this.password) {
      this.notificationService.errorTranslate('notification.missingRequiredFields');
      return;
    }
    this.chatRoomService.create(this.password).subscribe(response => {
      this.authorizeAndNavigate(response.uuid);
    });
  }

  joinChatRoom(): void {
    if (!this.uuid || !this.password) {
      this.notificationService.errorTranslate('notification.missingRequiredFields');
      return;
    }
    this.authorizeAndNavigate(this.uuid);
  }

  private authorizeAndNavigate(uuid: string) {
    this.chatRoomService.authorize(uuid, this.password).subscribe(token => {
      SessionStorageUtil.setAuthToken(token);
      this.router.navigate(['chat-room', uuid], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
