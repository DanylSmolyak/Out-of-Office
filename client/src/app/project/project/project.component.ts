import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../project.service";
import { Project } from "../../shared/Models/Project";
import { Employee } from "../../shared/Models/Employee";
import { AddEmployeeService } from "../../employee/add-employee.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  employees: Employee[] = [];
  sort = 'name';
  statusFilter!: number;
  searchTerm = "";

  sortOptions = [
    { name: 'Start Date asc', value: 'StartDateAsc' },
    { name: 'Start Date Desc', value: 'StartDateDesc' },
    { name: 'End Date Asc', value: 'EndDateAsc' },
    { name: 'End Date Desc', value: 'EndDateDesc' },
  ];

  constructor(
    private projectService: ProjectService,
    private employeeService: AddEmployeeService
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.getEmployees();
  }

  getProjects(): void {
    this.projectService.getProjects(this.sort, this.statusFilter,this.searchTerm).subscribe({
      next: projects => {
        this.projects = projects;
      },
      error: error => {
        console.log('Error fetching projects:', error);
      }
    });
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: employees => {
        this.employees = employees;
      },
      error: error => {
        console.log('Error fetching employees:', error);
      }
    });
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        console.log(`Project with id ${id} deleted successfully`);
        this.getProjects();
      },
      error: error => {
        console.error('Error deleting project:', error);
      }
    });
  }

  getStatusText(status: number): string {
    return status === 1 ? 'Inactive' : 'Active';
  }

  onSortChange(event: any): void {
    this.sort = event.target.value;
    this.getProjects();
  }

  onStatusFilterChange(event: any): void {
    this.statusFilter = event.target.value;
    this.getProjects();
  }
  findEmployeeFullName(employeeId: number): string {
    const employee = this.employees.find(emp => emp.id === employeeId);
    return employee ? employee.fullName : 'Unknown';
  }
  onSearch(): void {
    this.getEmployees();
  }
}
