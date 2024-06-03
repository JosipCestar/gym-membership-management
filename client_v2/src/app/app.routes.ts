import { Routes } from '@angular/router';
import { NewComponent } from './new/new.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: "dashboard", component: DashboardComponent,canActivate: [AuthGuard]},
    { path: "new", component: NewComponent,canActivate: [AuthGuard] },
    { path: "search", component: SearchComponent ,canActivate: [AuthGuard]}

];
