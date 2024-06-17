import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { ApprovalRequst } from "../shared/Models/ApprovalRequst";
import {AddApprovalRequestService} from "./add-approval-request.service";
import {AddLeaveRequestService} from "../leave-request/add-leave-request.service";
import {AddEmployeeService} from "../employee/add-employee.service";
import {Employee} from "../shared/Models/Employee";
import {LeaveRequest} from "../shared/Models/LeaveRequest";

@Component({
  selector: 'app-add-approval-request',
  templateUrl: './add-approval-request.component.html',
  styleUrls: ['./add-approval-request.component.scss']
})
export class AddApprovalRequestComponent implements OnInit{
  newApprovalRequest: ApprovalRequst = {
    id: 0,
    approverId: 0,
    leaveRequestId: 0,
    comment: '',
    status: 0
  };
  employees: Employee[] = [];
  leaveRequests: LeaveRequest[] = [];
  approvalRequests: ApprovalRequst[] = [];

  ngOnInit(): void {
    this.getEmployees();
    this.getLeaveRequest();
    this.getApprovalRequest();
  }

  constructor(private addApprovalRequestService: AddApprovalRequestService, private router: Router,private addLeaveRequestService: AddLeaveRequestService,private employeeService: AddEmployeeService) {}

  onSubmit(): void {
    console.log('Submitting approval request:', this.newApprovalRequest); // Log data being sent
    this.addApprovalRequestService.addApprovalRequest(this.newApprovalRequest).subscribe({
      next: (createdApprovalRequest) => {
        console.log('Approval request added successfully with id:', createdApprovalRequest.id);
        this.newApprovalRequest.id = createdApprovalRequest.id;
        this.router.navigateByUrl('/approval-requests');
      },
      error: error => {
        console.error('Error adding approval request:', error);
        // Log detailed error
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
  getApprovalRequest(): void {
    this.addApprovalRequestService.getApprovalRequest().subscribe({
      next: approvalRequests => {
        this.approvalRequests = approvalRequests;
      },
      error: error => console.log(error)
    })
  }
}
