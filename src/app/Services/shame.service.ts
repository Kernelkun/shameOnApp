import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ShameService {

  baseUrl = 'https://shameonapp.firebaseio.com/cases.json';

  constructor(private http: Http) { }

  getShameList() {
    return this.http.get(this.baseUrl).map((data) => {
      return data.json();
    });
  }
}
