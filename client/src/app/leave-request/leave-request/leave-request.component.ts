import { Component, OnInit } from '@angular/core';
import { LeaveRequest } from "../../shared/Models/LeaveRequest";
import { LeaveRequestService } from "../leave-request.service";
import {Employee} from "../../shared/Models/Employee";
import {AddEmployeeService} from "../../employee/add-employee.service";

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  sort = 'startDateAsc';
  searchTerm = "";
  statusFilter!: number;

  employees: Employee[] = [];

  sortOptions = [
    { name: 'Start Date asc', value: 'startDateAsc' },
    { name: 'Start Date Desc', value: 'startDateDesc' },
    { name: 'End Date Asc', value: 'endDateAsc' },
    { name: 'End Date Desc', value: 'endDateDesc' },
    { name: 'Status Asc', value: 'statusAsc' },
    { name: 'Status Desc', value: 'statusDesc' },
  ];

  constructor(private leaveRequestService: LeaveRequestService,  private employeeService: AddEmployeeService) { }

  ngOnInit(): void {
    this.getLeaveRequests();
    this.getEmployees();
  }

  getLeaveRequests(): void {
    this.leaveRequestService.getLeaveRequests(this.sort, this.statusFilter,this.searchTerm).subscribe({
      next: leaveRequests => {
        this.leaveRequests = leaveRequests;
      },
      error: error => console.error('Error fetching leave requests:', error)
    });
  }

  deleteLeaveRequest(id: number): void {
    this.leaveRequestService.deleteLeaveRequest(id).subscribe({
      next: () => {
        console.log(`Leave request with id ${id} deleted successfully`);
        this.getLeaveRequests();
      },
      error: error => {
        console.error('Error deleting leave request:', error);
      }
    });
  }

  onSortChange(event: any): void {
    this.sort = event.target.value;
    this.getLeaveRequests();
  }

  onStatusFilterChange(event: any): void {
    this.statusFilter = event.target.value; // Assign undefined if value is falsy
    this.getLeaveRequests();
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
    } else if (status === 3) {
      return 'Inactive';
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
