import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TrackTvService {
    omdbKey = '52383bfd';

    fanArtTv = '43d3985d4f86647aceaa124b336cc264';

    baseUrl = 'https://api.trakt.tv/';
    trendingUrl = 'https://api.trakt.tv/movies/trending';
    traktApiKey = 'b6b1ee85416c243aca5bf55d5b2f21aab96c76c3ae408d1fe13328ee6690a6e5';
    headers = new Headers({ 'Content-Type': 'application/json', 'trakt-api-version': '2', 'trakt-api-key': this.traktApiKey });

    constructor(private http: Http) { }

    searchMovie(query) {
        const queryURL = this.baseUrl + 'search/movie?query=' + query;
        return this.http.get(queryURL, { headers: this.headers }).map((data) => {
            return data.json();
        });
    }

    searchMovieByImdbId(id) {
        const queryURL = this.baseUrl + 'movies/' + id;
        return this.http.get(queryURL, { headers: this.headers }).map((data) => {
            return data.json();
        });
    }

    searchCastByMovieId(id) {
        const queryURL = this.baseUrl + 'movies/' + id + '/people';
        return this.http.get(queryURL, { headers: this.headers }).map((data) => {
            return data.json();
        });
    }

    searchPersonByName(name) {
        const queryURL = this.baseUrl + 'people/' + name;
        console.log(queryURL);
        return this.http.get(queryURL, { headers: this.headers }).map((data) => {
            return data.json();
        });
    }

    getTrendingList() {
        return this.http.get(this.trendingUrl, { headers: this.headers })
        .catch( (e) => {
            if (e.status = '0') {
                return Observable.throw (new Error('It\'s been imposible to get the movies because there is no connection') );
            }
            return Observable.throw (new Error(`${e.status} ${e.statusText}`) );
        }).map((data) => {
            return data.json();
        });
    }
}
