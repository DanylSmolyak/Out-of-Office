import {Component, OnInit} from '@angular/core';
import {Employee} from "../shared/Models/Employee";
import {AddEmployeeService} from "../employee/add-employee.service";
import {Router} from "@angular/router";
import {Project} from "../shared/Models/Project";
import {AddProjectService} from "./add-project.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit{
  newProject: Project = {
    id: 0,
    projectType: '',
    startDate: '',
    endDate: '',
    projectManagerId: 0,
    comment: '',
    status: 0, // по умолчанию Active
  };

  ngOnInit(): void {
    this.getEmployees();
    this.getProjects();
  }
  projects: Project[] = [];
  employees: Employee[] = [];

  constructor(private projectService: AddProjectService, private router: Router,private employeeService: AddEmployeeService) {}

  onSubmit(): void {
    this.projectService.addProject(this.newProject).subscribe({
      next: (createdProject) => {
        console.log('Project added successfully with id:', createdProject.id);
        this.newProject.id = createdProject.id; // Обновляем id в объекте newEmployee
        this.router.navigateByUrl('/employees');
      },
      error: error => {
        console.error('Error adding employee:', error);
        // Обработка ошибки, например, вывод сообщения пользователю
      }
    });
  }

  getProjects(){
    this.projectService.getProjects().subscribe({
      next: projects => {
        this.projects = projects;
      },
      error: error => console.log(error)
    })
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: employees => {
        this.employees = employees;
      },
      error: error => console.log(error)
    });
  }
}


