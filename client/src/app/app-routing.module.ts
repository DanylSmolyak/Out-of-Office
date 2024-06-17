import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponent} from "./employee/employee/employee.component";
import {LeaveRequestComponent} from "./leave-request/leave-request/leave-request.component";
import {ApprovalRequestComponent} from "./approval-request/approval-request/approval-request.component";
import {ProjectComponent} from "./project/project/project.component";
import {AddEmployeeComponent} from "./employee/add-employee.component";
import {EditEmployeeComponent} from "./employee/edit-employee.component";
import {AddProjectComponent} from "./project/add-project.component";
import {EditProjectComponent} from "./project/edit-project.component";
import {AddLeaveRequestComponent} from "./leave-request/add-leave-request.component";
import {EditLeaveRequestComponent} from "./leave-request/edit-leave-request.component";
import {EditApprovalRequestComponent} from "./approval-request/edit-approval-request.component";
import {AddApprovalRequestComponent} from "./approval-request/add-approval-request.component";

const routes: Routes = [
  { path: 'employees', component: EmployeeComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employees/edit-employee/:id', component: EditEmployeeComponent },
  { path: 'leave-requests', component: LeaveRequestComponent },
  { path: 'add-leave-requests', component: AddLeaveRequestComponent },
  { path: 'leave-requests/edit-leave-requests/:id', component: EditLeaveRequestComponent },
  { path: 'approval-requests', component: ApprovalRequestComponent },
  { path: 'add-approval-requests', component: AddApprovalRequestComponent },
  { path: 'approval-requests/edit-approval-requests/:id', component: EditApprovalRequestComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'add-projects', component: AddProjectComponent },
  { path: 'projects/edit-projects/:id', component: EditProjectComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
