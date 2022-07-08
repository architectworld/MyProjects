import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path:'', redirectTo:'signup', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'wishlist', component:WishlistComponent},
  {path:'viewlist', component:StudentDashboardComponent},
  {path:'dashboard', component:StudentDashboardComponent,canActivate:[AuthGuard]},
  {path:'detail', component:AdmindetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
