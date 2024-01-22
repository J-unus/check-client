import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRoomDto } from './dto/chat-room.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {
  private readonly RESOURCE_URL: string = environment.hotelApi + '/api/chat-room';

  constructor(private http: HttpClient) {}

  create(password: string): Observable<ChatRoomDto> {
    return this.http.post<ChatRoomDto>(this.RESOURCE_URL, { password });
  }

  authorize(uuid: string, password: string): Observable<string> {
    return this.http.post(this.RESOURCE_URL + '/authorize', { uuid, password }, { responseType: 'text' });
  }
}
