import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth-guard';
import { CustomerDetailsComponent } from './customer-service/customer-details/customer-details.component';
import { FragranceDetailsComponent } from './customer-service/fragrance-details/fragrance-details.component';
import { CustomerOrdersComponent } from './customer-service/customer-orders/customer-orders.component';
import { SamplesRequestedComponent } from './customer-service/samples-requested/samples-requested.component';
import { OrdersForDispatchComponent } from './dispatch-services/orders-for-dispatch/orders-for-dispatch.component';
import { ReqSamplesForDispatchComponent } from './dispatch-services/req-samples-for-dispatch/req-samples-for-dispatch.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in'},
  { path: 'registration', component: RegistrationComponent,},
  { path: 'sign-in', component: SignInComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'orders-for-dispatch', component: OrdersForDispatchComponent, canActivate: [AuthGuard]},
  { path: 'reqSamples-for-dispatch', component: ReqSamplesForDispatchComponent, canActivate: [AuthGuard]},
  { path: 'customer-details', component: CustomerDetailsComponent, canActivate: [AuthGuard]},
  { path: 'customer-orders', component: CustomerOrdersComponent, canActivate: [AuthGuard]},
  { path: 'fragrance', component: FragranceDetailsComponent, canActivate: [AuthGuard]},
  { path: 'samples-requested', component: SamplesRequestedComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
