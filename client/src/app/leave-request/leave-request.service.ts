import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LeaveRequest} from "../shared/Models/LeaveRequest";

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private baseUrl = 'http://localhost:5106/api/LeaveRequests'; // Замініть на ваш URL API

  constructor(private http: HttpClient) {}

  getLeaveRequests(sort: string, status: number,searchTerm:string): Observable<LeaveRequest[]> {
    let params = new HttpParams();
    if (sort) params = params.append('sort', sort);
    if (status) params = params.append('status', status.toString());
    if (searchTerm) params = params.append('search', searchTerm);
    return this.http.get<LeaveRequest[]>(this.baseUrl, { params });
  }

  deleteLeaveRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getLeaveRequestById(id: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${this.baseUrl}/${id}`);
  }

  updateLeaveRequest(leaveRequest: LeaveRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${leaveRequest.id}`, leaveRequest);
  }
}
