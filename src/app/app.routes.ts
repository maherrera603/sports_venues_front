import { Routes } from '@angular/router';
import { Singin } from './pages/singin/singin';
import { Singup } from './pages/singup/singup';
import { Dashboard } from './layouts/dashboard/dashboard';
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { userGuard,adminGuard, authGuard } from './guards';


export const routes: Routes = [
    {   path: "", 
        component: Singin,
        canActivate: [ authGuard ]
    },
    { 
        path: "crear-cuenta", 
        component: Singup,
        canActivate: [ authGuard ]
    },
    {
        path: "usuario", 
        component: Dashboard,
        canActivate: [ userGuard ],
        children: [
            { path: "", component: Home},
            { path: "perfil", component: Profile},
        ]
    },
    {
        path: "administrador", 
        component: Dashboard,
        canActivate: [ adminGuard ],
        children: [
            { path: "", component: Home},
            { path: "perfil", component: Profile},
        ]
    }
];
