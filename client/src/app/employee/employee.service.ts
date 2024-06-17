import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../shared/Models/Employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:5106/api/Employees'; // Замените на свой URL API


  constructor(private http: HttpClient) {
  }

  getEmployees(sort: string,status: number,searchTerm:string): Observable<Employee[]> {
    let params = new HttpParams();
    if (sort) params = params.append('sort', sort);
    if (status) params = params.append('status', status.toString());
    if (searchTerm) params = params.append('search', searchTerm);
    return this.http.get<Employee[]>(this.baseUrl ,{params});
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


  getStatusText(status: number): string {
    return status === 1 ? 'Inactive' : 'Active';
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${employee.id}`, employee);
  }

}
