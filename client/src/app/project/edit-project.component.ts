import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../shared/Models/Project';
import { ProjectService } from './project.service';
import { Employee } from '../shared/Models/Employee';
import { AddEmployeeService } from '../employee/add-employee.service';
import {AddProjectService} from "./add-project.service";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  projectId!: number;
  project: Project = {
    id: 0,
    projectType: '',
    startDate: '',
    endDate: '',
    projectManagerId: 0,
    comment: '',
    status: 0 // по умолчанию Active
  };
  employees: Employee[] = [];
  projects: any[] = []; // Замените any на тип вашего проекта

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private addEmployeeService: AddEmployeeService,
    private addProjectService: AddProjectService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.projectId = +idParam;
      this.getProjectDetails(this.projectId);
    } else {
      console.error('Project id not found in route parameters');
    }
    this.getEmployees();
    this.getProjects();

  }

  getProjectDetails(id: number): void {
    this.projectService.getProjectById(id).subscribe({
      next: project => {
        this.project = project;
        // Преобразование дат к формату yyyy-MM-dd для отображения в форме
        this.project.startDate = this.formatDateForForm(this.project.startDate);
        this.project.endDate = this.formatDateForForm(this.project.endDate);
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

  onSubmit(): void {
    // Преобразование дат к формату yyyy-MM-ddTHH:mm:ss.sssZ перед отправкой на сервер
    this.project.startDate = this.formatDateForServer(this.project.startDate);
    this.project.endDate = this.formatDateForServer(this.project.endDate);

    this.projectService.updateProject(this.project).subscribe({
      next: () => {
        console.log('Project updated successfully');
        this.router.navigateByUrl('/projects');
      },
      error: error => {
        console.error('Error updating project:', error);
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


  formatDateForServer(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }

  getProjects(){
    this.addProjectService.getProjects().subscribe({
      next: projects => {
        this.projects = projects;
      },
      error: error => console.log(error)
    })
  }
}
