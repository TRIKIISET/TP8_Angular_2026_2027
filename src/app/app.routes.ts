import { Routes } from '@angular/router';
import { ParkList } from './EXERCICE/components/park-list/park-list';
import { ParkSelected } from './EXERCICE/components/park-selected/park-selected';
import { Error } from './EXERCICE/components/error/error';

export const routes: Routes = [
    { path:'parks', title:"Parcs", component:ParkList},
    { path:'parks/:idPark', title:"Parc Sélectionné", component:ParkSelected},
    {path:'', redirectTo:'parks', pathMatch:'full'},
    { path:'**', title:"Erreur", component:Error}
];
