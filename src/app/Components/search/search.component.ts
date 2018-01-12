import { Component, OnInit, Input } from '@angular/core';
import { TrackTvService } from '../../Services/trackTv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit  {

  @Input() sendTo: string;
  @Input() mode: string;
  activeClass: string;
  datos = [];
  // query: string;
  @Input() searchValue: string;

  constructor(private trackTv: TrackTvService, private router: Router) {
  }

  ngOnInit() {
    this.searchValue = ( this.searchValue === undefined ? '' : this.searchValue );
    this.activeClass = (this.mode ? this.mode : 'searchBottom');
  }

  search(query) {
    if (query !== '') {
      this.router.navigate(['/list', query]);

      this.searchValue = query;
      console.log('searchValue: ' + this.searchValue);
    }
  }
}
