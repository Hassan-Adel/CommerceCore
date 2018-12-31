import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomeDetails } from '../../shared/models/home-details.interface';
import { ConfigService } from '../../shared/utils/config.service';

import {BaseService} from '../../services/base.service';

import { Observable } from 'rxjs/Rx'; 

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()

export class DashboardService extends BaseService {

  baseUrl: string = ''; 

  constructor(private http: HttpClient, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }

  getHomeDetails(): Observable<HomeDetails> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    // or chain them all together this way:
    //const headers = new HttpHeaders().set('appkey', '123').set('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + "/dashboard/home", { headers })
      .map(response => response)
      .catch(this.handleError);
  }  
}
