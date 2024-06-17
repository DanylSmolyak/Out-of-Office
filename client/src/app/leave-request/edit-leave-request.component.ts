import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { LeaveRequest } from "../shared/Models/LeaveRequest";
import {LeaveRequestService} from "./leave-request.service";
import {Employee} from "../shared/Models/Employee";
import {AddLeaveRequestService} from "./add-leave-request.service";
import {AddEmployeeService} from "../employee/add-employee.service";


@Component({
  selector: 'app-edit-leave-request',
  templateUrl: './edit-leave-request.component.html',
  styleUrls: ['./edit-leave-request.component.scss']
})
export class EditLeaveRequestComponent implements OnInit {
  leaveRequestId!: number;
  leaveRequest: LeaveRequest = {
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



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaveRequestService: LeaveRequestService,
    private addLeaveRequestService: AddLeaveRequestService,
    private employeeService: AddEmployeeService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.leaveRequestId = +idParam;
      this.getLeaveRequestDetails(this.leaveRequestId);
    } else {
      console.error('Leave request id not found in route parameters');
    }
    this.getLeaveRequest();
    this.getEmployees();

  }

  getLeaveRequestDetails(id: number): void {
    this.leaveRequestService.getLeaveRequestById(id).subscribe({
      next: leaveRequest => {
        this.leaveRequest = leaveRequest;
        // Преобразование дат к формату yyyy-MM-dd для отображения в форме
        this.leaveRequest.startDate = this.formatDateForForm(this.leaveRequest.startDate);
        this.leaveRequest.endDate = this.formatDateForForm(this.leaveRequest.endDate);
      },
      error: error => console.log(error)
    });
  }

  formatDateForForm(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatDateForServer(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }

  onSubmit(): void {
    // Преобразование дат к формату yyyy-MM-ddTHH:mm:ss.sssZ перед отправкой на сервер
    this.leaveRequest.startDate = this.formatDateForServer(this.leaveRequest.startDate);
    this.leaveRequest.endDate = this.formatDateForServer(this.leaveRequest.endDate);

    this.leaveRequestService.updateLeaveRequest(this.leaveRequest).subscribe({
      next: () => {
        console.log('Leave request updated successfully');
        this.router.navigateByUrl('/leave-requests');
      },
      error: error => {
        console.error('Error updating leave request:', error);
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
