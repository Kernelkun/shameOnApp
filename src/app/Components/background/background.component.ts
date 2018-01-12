import { Component, OnInit, Input } from '@angular/core';
import { TrackTvService } from '../../Services/trackTv.service';
import { FanArtService } from '../../Services/fanArt.service';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  title: string;
  firstWord: string;
  restOfTitle: string;
  showType: string;
  @Input() cmpHeigth: string;
  @Input() isList: string;
  @Input() mode: string;
  @Input() backgroundUrl: string;
  @Input() titleName: string;
  showTitle: boolean;
  showRoot: boolean;

  imgUrl: string;

  constructor(private trackTv: TrackTvService, private fanArt: FanArtService, private http: Http) { }

  ngOnInit() {

    this.imgUrl = ( this.backgroundUrl ? this.backgroundUrl : '' );

    // this.showType = 'FILM'.toUpperCase();
    this.showType = 'Film';

    switch (this.mode) {
      case 'film':
        this.firstWord = this.getFirstWord(this.titleName).toUpperCase();
        this.restOfTitle = this.getRestOfSentence(this.titleName).toUpperCase();

        this.showTitle = true;
        this.showRoot = false;
        break;
      case 'show':
        this.showTitle = true;
        this.showRoot = false;
        break;
      case 'root':
        this.title = 'Shame On App'.toUpperCase();

        this.showTitle = false;
        this.showRoot = true;
        this.getRandomBackground();
        break;
      default:
        break;

    }
  }

  getFirstWord(sentence) {
    sentence = sentence.split(' ');
    return sentence[0];
  }

  getRestOfSentence(sentence) {
    sentence = sentence.split(' ');
    const array = [];
    for ( let i = 1; i < sentence.length; i++ ) {
      array.push(sentence[i]);
    }
    return array.join(' ');
  }

  getRandomBackground() {
    const imdbId = this.trackTv.getTrendingList().subscribe( (res) => {
      const randomMovie = Math.floor(Math.random() * 9) + 0;

      this.fanArt.getImageById(res[randomMovie].movie.ids.imdb).subscribe( (img) => {
        if (img.movieposter) {
          const randomPoster = Math.floor(Math.random() * img.movieposter.length) + 0;
          // this.imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Raununkiaer.jpg';
          this.imgUrl = img.movieposter[randomPoster].url;
          this.http.head(this.imgUrl)
          .map((response) => response.status)
          .catch((error) => Observable.of(error.status || 404))
            .subscribe((status) => {
              if (status !== 200) {
                this.imgUrl = '../../../assets/img/poster.jpg';
              }
            });
        }
      });
    });
  }

  getMyStyles() {
    const myStyles = {
      'background-image': !this.imgUrl ? 'url("../../../assets/img/poster.jpg")' : 'url(' + this.imgUrl + ')'
    };
    return myStyles;
  }
}
