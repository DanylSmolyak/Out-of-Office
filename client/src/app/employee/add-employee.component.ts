import {Component, OnInit} from '@angular/core';
import {Employee} from "../shared/Models/Employee";
import {Router} from "@angular/router";
import {AddEmployeeService} from "./add-employee.service";


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit{

  newEmployee: Employee = {
    id: 0,
    fullName: '',
    subdivision: '',
    position: '',
    status: 0, // по умолчанию Active
    peoplePartnerId: 0,
    outOfOfficeBalance: 0,
    photo: ''
  };

  ngOnInit(): void {
    this.getEmployees();
  }
  employees: Employee[] = [];

  constructor(private employeeService: AddEmployeeService, private router: Router) {}

  onSubmit(): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: (createdEmployee) => {
        console.log('Employee added successfully with id:', createdEmployee.id);
        this.newEmployee.id = createdEmployee.id; // Обновляем id в объекте newEmployee
        this.router.navigateByUrl('/employees');
      },
      error: error => {
        console.error('Error adding employee:', error);
        // Обработка ошибки, например, вывод сообщения пользователю
      }
    });
  }
  getEmployees(){
    this.employeeService.getEmployees().subscribe({
      next: employees => {
        this.employees = employees;
      },
      error: error => console.log(error)
    })
  }

}
