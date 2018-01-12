import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { ListComponent } from '../Components/list/list.component';
import { ShowComponent } from '../Components/show/show.component';
import { TrashComponent } from '../Components/trash/trash.component';
import { ErrorComponent } from '../Components/error/error.component';

const APP_ROUTES: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'list/:query', component: ListComponent },
	{ path: 'show/:id', component: ShowComponent },
	{ path: 'trash', component: TrashComponent },
	{ path: '**', component: ErrorComponent}
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
