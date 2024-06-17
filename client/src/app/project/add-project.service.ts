import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../shared/Models/Project";
import {Employee} from "../shared/Models/Employee";

@Injectable({
  providedIn: 'root'
})
export class AddProjectService {
  private baseUrl = 'http://localhost:5106/api/Projects'; // Поменяйте на свой URL API

  constructor(private http: HttpClient) {}

  addProject(newProject: Project): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, newProject);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}`);
  }
}
