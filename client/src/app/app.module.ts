import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './employee/employee/employee.component';
import { LeaveRequestComponent } from './leave-request/leave-request/leave-request.component';
import { ApprovalRequestComponent } from './approval-request/approval-request/approval-request.component';
import { ProjectComponent } from './project/project/project.component';
import {RouterModule} from "@angular/router";
import {EmployeeService} from "./employee/employee.service";
import {HttpClientModule} from "@angular/common/http";
import {AddEmployeeComponent} from "./employee/add-employee.component";
import {FormsModule} from "@angular/forms";
import { EditEmployeeComponent } from './employee/edit-employee.component';
import { AddProjectComponent } from './project/add-project.component';
import { EditProjectComponent } from './project/edit-project.component';
import { AddLeaveRequestComponent } from './leave-request/add-leave-request.component';
import { EditLeaveRequestComponent } from './leave-request/edit-leave-request.component';
import { AddApprovalRequestComponent } from './approval-request/add-approval-request.component';
import { EditApprovalRequestComponent } from './approval-request/edit-approval-request.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    LeaveRequestComponent,
    ApprovalRequestComponent,
    ProjectComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    AddProjectComponent,
    EditProjectComponent,
    AddLeaveRequestComponent,
    EditLeaveRequestComponent,
    AddApprovalRequestComponent,
    EditApprovalRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
