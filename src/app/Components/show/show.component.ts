import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackTvService } from '../../Services/trackTv.service';
import { FanArtService } from '../../Services/fanArt.service';
import { ShameService } from '../../Services/shame.service';
import { TmdbService } from '../../Services/tmdb.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  titleName: string;
  backgroundUrl: string;
  imdbId: string;
  currentFilm;

  shameList = [];
  isClean;

  constructor(private route: ActivatedRoute, private trackTv: TrackTvService,
    private fanArt: FanArtService, private shame: ShameService, private tmdb: TmdbService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.imdbId = params.id);
    this.currentFilm = JSON.parse(localStorage.getItem('currentFilm'));

    this.titleName = (this.currentFilm.title ? this.currentFilm.title : '' );
    this.backgroundUrl = (this.currentFilm.backgroundUrl ? this.currentFilm.backgroundUrl : '' );
    this.getShameList();
  }

  getShameList() {
    this.trackTv.searchCastByMovieId(this.imdbId).subscribe((cast) => {
      this.shame.getShameList().subscribe((shame) => {
        for (const s of shame) {
          const obj = this.getObjects(cast, 'trakt', parseInt(s.ids.trakt, 10) );
          if (obj.length > 0 && obj[0].trakt === parseInt(s.ids.trakt, 10)) {
            this.isClean = false;
            this.tmdb.getImageByPerson(s.ids.tmdb).subscribe((img) => {
              s.img = img;
              this.shameList.push(s);
            });
          }
        }
      },
      (err) => console.error(err),
      () => {
        this.isClean = (this.isClean === undefined || this.isClean === true ? true : false);
      });
    });
  }

  // Thanks to -> https://gist.github.com/iwek/3924925
  getObjects(obj, key, val) {
    let objects = [];
    for (const i in obj) {
      if (!obj.hasOwnProperty(i)) { continue; }
      if (typeof obj[i] === 'object') {
        objects = objects.concat(this.getObjects(obj[i], key, val));
      } else
        // if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches
        // but passed value does not)
        if (i === key && obj[i] === val || i === key && val === '') { //
          objects.push(obj);
        } else if (obj[i] === val && key === '') {
          // only add if the object is not already in the array
          if (objects.lastIndexOf(obj) === -1) {
            objects.push(obj);
          }
        }
    }
    return objects;
  }
}
