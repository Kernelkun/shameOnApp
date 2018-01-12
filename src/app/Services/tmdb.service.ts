import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TmdbService {

  apiKey = '430a3814ea65a8176149e2a296b26447';

  baseUrl = 'https://api.themoviedb.org/3/';

  constructor(private http: Http) { }

  getImageByPerson(personId) {
    const queryURL = this.baseUrl + 'person/' + personId + '?api_key=' + this.apiKey + '&language=en-US';
    return this.http.get(queryURL).map((data) => {
      return 'https://image.tmdb.org/t/p/w300' + data.json().profile_path;
    });
  }

  searchPerson(personId) {
    const queryURL = this.baseUrl + 'person/' + personId + '?api_key=' + this.apiKey + '&language=en-US';
    return this.http.get(queryURL).map((data) => {
      return data.json();
    });
  }

}
