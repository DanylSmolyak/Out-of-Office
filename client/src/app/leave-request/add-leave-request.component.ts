import {Component, OnInit} from '@angular/core';
import { LeaveRequest } from "../shared/Models/LeaveRequest";
import { Router } from "@angular/router";
import { AddLeaveRequestService } from "./add-leave-request.service";
import {Employee} from "../shared/Models/Employee";
import {AddEmployeeService} from "../employee/add-employee.service";


@Component({
  selector: 'app-add-leave-request',
  templateUrl: './add-leave-request.component.html',
  styleUrls: ['./add-leave-request.component.scss']
})
export class AddLeaveRequestComponent implements OnInit{
  newLeaveRequest: LeaveRequest = {
    id: 0,
    employeeId: 0,
    absenceReason: '',
    startDate: '',
    endDate: '',
    comment: '',
    status: 0
  };
  employees: Employee[] = [];
  leaveRequests: LeaveRequest[] = [];

  ngOnInit(): void {
    this.getEmployees();
    this.getLeaveRequest();
  }

  constructor(private addLeaveRequestService: AddLeaveRequestService, private router: Router,private employeeService: AddEmployeeService) {}

  onSubmit(): void {
    console.log('Submitting leave request:', this.newLeaveRequest); // Log data being sent
    this.addLeaveRequestService.addLeaveRequest(this.newLeaveRequest).subscribe({
      next: (createdLeaveRequest) => {
        console.log('Leave request added successfully with id:', createdLeaveRequest.id);
        this.newLeaveRequest.id = createdLeaveRequest.id;
        this.router.navigateByUrl('/leave-requests');
      },
      error: error => {
        console.error('Error adding leave request:', error);
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
}
