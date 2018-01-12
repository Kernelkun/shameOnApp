import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FanArtService {
    fanArtTvKey = 'aa5fec9006a5c587105ed83d3dcf4384';

    baseUrl = 'http://webservice.fanart.tv/v3/movies/';
    // headers = new Headers({ 'Content-Type': 'application/json', 'trakt-api-version': '2', 'trakt-api-key': this.clientId });

    result = [];

    constructor(private http: Http) { }

    getImageById(id) {
        return this.http.get(this.baseUrl + id + '?api_key=' + this.fanArtTvKey).map((data) => {
            return data.json();
        });
    }
}
