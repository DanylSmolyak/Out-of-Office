import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../../shared/Models/Employee";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  sort = 'name';
  statusFilter!: number;
  searchTerm = "";

  sortOptions = [
    {name: 'Balance low to high', value: 'OutOfOfficeBalanceAsc'},
    {name: 'Balance high to low', value: 'OutOfOfficeBalanceDesc'},
    {name: 'Alphabetical A-Z', value: 'nameAsc'},
    {name: 'Alphabetical Z-A', value: 'nameDesc'},
  ];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees(){
    this.employeeService.getEmployees(this.sort, this.statusFilter, this.searchTerm).subscribe({
      next: employees => {
        this.employees = employees;
      },
      error: error => console.log(error)
    })
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        console.log(`Employee with id ${id} deleted successfully`);
        // Если требуется обновить список сотрудников после удаления
        this.getEmployees();
      },
      error: error => {
        console.error('Error deleting employee:', error);
        // Обработка ошибки, например, вывод сообщения пользователю
      }
    });
  }

  getStatusText(status: number): string {
    return this.employeeService.getStatusText(status);
  }

  onSortChange(event: any): void {
    this.sort = event.target.value;
    this.getEmployees();
  }

  onStatusFilterChange(event: any): void {
    this.statusFilter = event.target.value;
    this.getEmployees();
  }

  onSearch(): void {
    this.getEmployees(); // Вызываем метод получения сотрудников при изменении поискового запроса
  }
}
