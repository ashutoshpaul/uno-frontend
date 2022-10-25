import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService, SESSION_KEY } from '../services/session-storage.service';

@Injectable({
  providedIn: "root",
})
export class HeadersInterceptor implements HttpInterceptor {

  constructor(
    private readonly _sessionStorageService: SessionStorageService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = request.clone({
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        "socket-id": this._socketId,
      })
    });

    return next.handle(req);
  }

  private get _socketId(): string {
    return this._sessionStorageService.getItem(SESSION_KEY.socketId);
  }
}
