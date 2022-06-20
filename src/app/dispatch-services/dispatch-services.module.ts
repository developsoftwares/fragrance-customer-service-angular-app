import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersForDispatchComponent } from './orders-for-dispatch/orders-for-dispatch.component';
import { CustomerServiceModule } from '../customer-service/customer-service.module';
import { DispatchNavComponent } from './dispatch-nav/dispatch-nav.component';
import { ReqSamplesForDispatchComponent } from './req-samples-for-dispatch/req-samples-for-dispatch.component';
import { DeleteSampleDialogComponent } from './req-samples-for-dispatch/req-samples-dialogs/delete-sample-dialog/delete-sample-dialog.component';
import { MatCheckboxModule } from '@angular/material';
import { DeleteCheckedSamplesNotificationComponent } from './req-samples-for-dispatch/req-samples-dialogs/delete-checked-samples-notification/delete-checked-samples-notification.component';
import { CantDeleteAllCheckedSamplesNotificationComponent } from './req-samples-for-dispatch/req-samples-dialogs/cant-delete-all-checked-samples-notification/cant-delete-all-checked-samples-notification.component';
import { DeleteOrdersForDispatchComponent } from './orders-for-dispatch/orders-for-dispatch-dialogs/delete-orders-for-dispatch/delete-orders-for-dispatch.component';

@NgModule({
  declarations: [
    OrdersForDispatchComponent,
    DispatchNavComponent,
    ReqSamplesForDispatchComponent,
    DeleteSampleDialogComponent,
    DeleteCheckedSamplesNotificationComponent,
    CantDeleteAllCheckedSamplesNotificationComponent,
    DeleteOrdersForDispatchComponent,
    
  ],
  entryComponents: [
    DeleteSampleDialogComponent,
    DeleteCheckedSamplesNotificationComponent,
    CantDeleteAllCheckedSamplesNotificationComponent,
    DeleteOrdersForDispatchComponent
  ],

  imports: [
    CommonModule,
    CustomerServiceModule,
    MatCheckboxModule
  ]
})
export class DispatchServicesModule { }
