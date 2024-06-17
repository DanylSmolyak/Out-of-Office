import { Component, OnInit } from '@angular/core';
import { ApprovalRequst } from "../../shared/Models/ApprovalRequst";
import { ApprovalRequestService } from "../approval-request.service";
import {Employee} from "../../shared/Models/Employee";
import {AddEmployeeService} from "../../employee/add-employee.service";

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrls: ['./approval-request.component.scss']
})
export class ApprovalRequestComponent implements OnInit {
  approvalRequests: ApprovalRequst[] = [];
  sort = 'startDateAsc';
  statusFilter!: number;
  employees: Employee[] = [];
  searchTerm = "";

  sortOptions = [
    { name: 'Approver Asc', value: 'approverIdAsc' },
    { name: 'Approver Desc', value: 'approverIdDesc' },
    { name: 'Status Asc', value: 'statusAsc' },
    { name: 'Status Desc', value: 'statusDesc' },
    { name: 'Leave Request Asc', value: 'leaveRequestIdAsc' },
    { name: 'Leave Request Desc', value: 'leaveRequestIdDesc' },
  ];

  constructor(private approvalRequestService: ApprovalRequestService, private employeeService: AddEmployeeService) { }

  ngOnInit(): void {
    this.getApprovalRequests();
    this.getEmployees();
  }

  getApprovalRequests(): void {
    this.approvalRequestService.getApprovalRequests(this.sort, this.statusFilter, this.searchTerm).subscribe({
      next: approvalRequests => {
        this.approvalRequests = approvalRequests;
      },
      error: error => console.error('Error fetching approval requests:', error)
    });
  }

  deleteApprovalRequest(id: number): void {
    this.approvalRequestService.deleteApprovalRequest(id).subscribe({
      next: () => {
        console.log(`Approval request with id ${id} deleted successfully`);
        this.getApprovalRequests();
      },
      error: error => {
        console.error('Error deleting approval request:', error);
      }
    });
  }


  onSortChange(event: any): void {
    this.sort = event.target.value;
    this.getApprovalRequests();
  }

  onStatusFilterChange(event: any): void {
    this.statusFilter = event.target.value;
    this.getApprovalRequests();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: employees => {
        this.employees = employees;
      },
      error: error => console.log(error)
    });
  }

  findEmployeeFullName(employeeId: number): string {
    const employee = this.employees.find(emp => emp.id === employeeId);
    return employee ? employee.fullName : 'Unknown';
  }

  onSearch(): void {
    this.getEmployees();
  }

  getStatusText(status: number): string {
    if (status === 0) {
      return 'New';
    } else if (status === 1) {
      return 'Submit';
    } else if (status === 2) {
      return 'Cancel';
    } else {
      return 'Unknown';
    }
  }
  getStatusClass(status: number): string {
    if (status === 0) {
      return 'text-primary';
    } else if (status === 1) {
      return 'text-success';
    } else if (status === 2) {
      return 'text-danger';
    } else {
      return '';
    }
  }
}
