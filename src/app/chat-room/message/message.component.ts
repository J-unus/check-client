import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from "../../web-socket/web-socket.service";
import {map, Subscription} from "rxjs";
import {MessageDto} from "../dto/message.dto";
import {StompHeaders} from "@stomp/rx-stomp";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'checkpoint-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  private readonly TOPIC_ENDPOINT = '/topic/checkpoint';
  private readonly MESSAGE_DESTINATION = '/app/checkpoint';
  receivedMessages: MessageDto[] = [];
  private topicSubscription: Subscription;
  message: string;
  chatRoomUuid: string;

  constructor(private webSocketService: WebSocketService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.chatRoomUuid = params.get('uuid');
      this.initPage();
    });
  }

  private initPage(): void {
    const subHeaders: StompHeaders = {chatRoomUuid: this.chatRoomUuid};
    this.topicSubscription = this.webSocketService
      .watch({destination: this.TOPIC_ENDPOINT, subHeaders})
      .pipe(map(message => JSON.parse(message.body)))
      .subscribe((message: MessageDto) => {
        this.receivedMessages.push(message);
      });
    this.webSocketService.activate();
  }

  ngOnDestroy(): void {
    if (this.topicSubscription) {
      this.topicSubscription.unsubscribe();
    }
    if (this.webSocketService.active) {
      this.webSocketService.deactivate();
    }
  }

  sendMessage(): void {
    this.webSocketService.publish({destination: this.MESSAGE_DESTINATION, body: this.message});
  }
}
