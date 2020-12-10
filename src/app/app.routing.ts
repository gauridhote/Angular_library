import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin';
import { UpdateComponent } from './update/update.component';
import { AddbookComponent } from './addbook/addbook.component';
import { AboutUsComponent } from './about-us/about-us.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Librarian] }
    },
    {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User] }
    },
    {
        path: 'login',
        component: LoginComponent,
        
    },
    {
        path: 'update/:id',
        component: UpdateComponent,
        
    },
    {
        path:'addbook',
        component: AddbookComponent,
    },
    {
        path:'aboutUs',
        component: AboutUsComponent,
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);