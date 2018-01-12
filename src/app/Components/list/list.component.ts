import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackTvService } from '../../Services/trackTv.service';
import { FanArtService } from '../../Services/fanArt.service';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  searchValue: string;
  titleName: string;
  backgroundUrl: string;
  list;

  message: string;

  constructor(private route: ActivatedRoute, private trackTv: TrackTvService,
    private fanArt: FanArtService, private http: Http, private router: Router) { }

  ngOnInit() {
    this.backgroundUrl = '../../../assets/img/poster.jpg';
    this.titleName = 'Unbreakable Kimi';
    this.route.params.subscribe(params => {
      this.searchValue = params.query;
      this.getList();
      this.list = [];
    });
  }

  getList() {
    this.trackTv.searchMovie(this.searchValue).subscribe((res) => {
      console.log(res);

      for (const item of res) {

        this.fanArt.getImageById(item.movie.ids.imdb).subscribe((img) => {

          if (img.movieposter) {
            this.list.push( { id: item.movie.ids.trakt, name: item.movie.title, background: img.movieposter[0].url } );
          } else {
            this.list.push( { id: item.movie.ids.trakt, name: item.movie.title, background: '../../../assets/img/travolta2.webp' });
          }
        });
      }

    });
  }

  goTo(item) {
    this.updateData(item.name, item.background);
    this.router.navigate(['/show', item.id]);
  }

  updateData(title: string, backgroundUrl: string) {
    // this.trackTv.setTitle(title);
    // this.trackTv.setBackgroundUrl(backgroundUrl);
    localStorage.setItem('currentFilm', JSON.stringify({ title: title, backgroundUrl: backgroundUrl }));
  }
}
