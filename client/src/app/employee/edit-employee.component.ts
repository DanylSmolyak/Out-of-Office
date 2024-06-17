import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "./employee.service";
import {Employee} from "../shared/Models/Employee";
import {AddEmployeeService} from "./add-employee.service";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  employeeId!: number;
  employee: Employee = {
    id: 0,
    fullName: '',
    subdivision: '',
    position: '',
    status: 0,
    peoplePartnerId: 0,
    outOfOfficeBalance: 0,
    photo: ''
  };


  employees: Employee[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private addEmployeeService: AddEmployeeService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.employeeId = +idParam;
      this.getEmployeeDetails(this.employeeId);
    } else {
      // Обработка случая, когда id отсутствует в маршруте
      console.error('Employee id not found in route parameters');
    }
    this.getEmployees();
  }

  getEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: employee => {
        this.employee = employee;
      },
      error: error => console.log(error)
    });
  }

  onSubmit(): void {
    this.employeeService.updateEmployee(this.employee).subscribe({
      next: () => {
        console.log('Employee updated successfully');
        this.router.navigateByUrl('/employees');
      },
      error: error => {
        console.error('Error updating employee:', error);
      }
    });
  }
  getEmployees(): void {
    this.addEmployeeService.getEmployees().subscribe({
      next: employees => {
        this.employees = employees;
      },
      error: error => console.log(error)
    });
  }
}
