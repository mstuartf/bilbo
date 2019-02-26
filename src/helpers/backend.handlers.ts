import { HttpRequest, HttpResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';

// request.url, request.method, request.headers, request.params, request.body
export const fakeBackend = {
    login: {
        POST: {
            handler(request: HttpRequest<any>) {

                if (request.body.email_address && request.body.password)
                    return of(new HttpResponse({ status: 200, body: {} }));
                 
                else 
                    return throwError({ error: { message: 'Username or password is incorrect' } });

            }
        }
    },
    register: {
        POST: {
            handler(request: HttpRequest<any>) {
                
            }
        }
    },
    bills: {
        GET: {
            handler(request: HttpRequest<any>) {
                
            }
        },
        POST: {
            handler(request: HttpRequest<any>) {
                
            }
        },
        DELETE: {
            handler(request: HttpRequest<any>) {
                
            }
        }
    }
}
