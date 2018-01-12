import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { ListComponent } from './Components/list/list.component';
import { ShowComponent } from './Components/show/show.component';
import { TrashComponent } from './Components/trash/trash.component';
import { ErrorComponent } from './Components/error/error.component';
import { ROUTING } from './Routes/app.routes';
import { BackgroundComponent } from './Components/background/background.component';
import { SearchComponent } from './Components/search/search.component';
import { TrackTvService } from './Services/trackTv.service';
import { FanArtService } from './Services/fanArt.service';
import { ShameService } from './Services/shame.service';
import { TmdbService } from './Services/tmdb.service';
import { HttpModule } from '@angular/http';
import { CleanUrlPipe } from './Pipes/clean-url.pipe';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoadingScreenComponent } from './Components/loading-screen/loading-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    ShowComponent,
    TrashComponent,
    ErrorComponent,
    BackgroundComponent,
    SearchComponent,
    CleanUrlPipe,
    NavbarComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    HttpModule
  ],
  providers: [TrackTvService, FanArtService, ShameService, TmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
