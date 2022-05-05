
import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(req: any, next: any) {
    let headerOptions = req.clone({
      headers: req.headers.set(
        "Authorization",
        // Here i am hardcoding my accesstoken for the authorization 
        "Bearer 353f1ddf1593129dd7b9bfef51fe4c05b6f5cef2104435f8c582ef0d410eafca" 
      )
    });
    return next.handle(headerOptions);
  }
}
