import {Injectable} from "@angular/core";
import SessionStorageUtil from "../../shared/util/session-storage.util";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  isAuthenticated(): boolean {
    return !!SessionStorageUtil.getAuthToken();
  }

  removeAuthentication(): void {
    SessionStorageUtil.clearAll();
  }
}
