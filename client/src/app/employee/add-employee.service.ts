import { Injectable } from '@angular/core';
import {Employee} from "../shared/Models/Employee";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeService {

  private baseUrl = 'http://localhost:5106/api/Employees'; // Поменяйте на свой URL API

  constructor(private http: HttpClient) {}

  addEmployee(newEmployee: Employee): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, newEmployee);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`);
  }

}
