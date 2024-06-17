import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../shared/Models/Employee";
import {Project} from "../shared/Models/Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:5106/api/Projects'; // Замените на свой URL API
  private employeesUrl = 'http://localhost:5106/api/Employees';


  constructor(private http: HttpClient) {
  }

  getProjects(sort: string, status: number | undefined,searchTerm:string): Observable<Project[]> {
    let params = new HttpParams();
    if (sort) params = params.append('sort', sort);
    if (status !== undefined) params = params.append('status', status.toString());
    if (searchTerm) params = params.append('search', searchTerm);
    return this.http.get<Project[]>(this.baseUrl, { params });
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getStatusText(status: number): string {
    return status === 1 ? 'Inactive' : 'Active';
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  updateProject(project: Project): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${project.id}`, project);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl);
  }

}
