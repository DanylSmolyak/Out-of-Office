import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApprovalRequestService } from "./approval-request.service";
import {ApprovalRequst} from "../shared/Models/ApprovalRequst";
import {Employee} from "../shared/Models/Employee";
import {AddEmployeeService} from "../employee/add-employee.service";
import {LeaveRequest} from "../shared/Models/LeaveRequest";
import {AddLeaveRequestService} from "../leave-request/add-leave-request.service";

@Component({
  selector: 'app-edit-approval-request',
  templateUrl: './edit-approval-request.component.html',
  styleUrls: ['./edit-approval-request.component.scss']
})
export class EditApprovalRequestComponent implements OnInit {
  approvalRequestId!: number;
  approvalRequest: ApprovalRequst = {
    id: 0,
    approverId: 0,
    leaveRequestId: 0,
    comment: '',
    status: 0
  };

  employees: Employee[] = [];
  leaveRequests: LeaveRequest[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private approvalRequestService: ApprovalRequestService,
    private employeeService: AddEmployeeService,
    private addLeaveRequestService: AddLeaveRequestService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.approvalRequestId = +idParam;
      this.getApprovalRequestDetails(this.approvalRequestId);
    } else {
      console.error('Approval request id not found in route parameters');
    }
    this.getEmployees();
    this.getLeaveRequest();
  }

  getApprovalRequestDetails(id: number): void {
    this.approvalRequestService.getApprovalRequestById(id).subscribe({
      next: approvalRequest => {
        this.approvalRequest = approvalRequest;
      },
      error: error => console.log(error)
    });
  }

  onSubmit(): void {
    this.approvalRequestService.updateApprovalRequest(this.approvalRequest).subscribe({
      next: () => {
        console.log('Approval request updated successfully');
        this.router.navigateByUrl('/approval-requests');
      },
      error: error => {
        console.error('Error updating approval request:', error);
      }
    });
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: employees => {
        this.employees = employees;
      },
      error: error => console.log(error)
    });
  }
  getLeaveRequest(): void {
    this.addLeaveRequestService.getLeaveRequest().subscribe({
      next: leaveRequests => {
        this.leaveRequests = leaveRequests;
      },
      error: error => console.log(error)
    })
  }

}
