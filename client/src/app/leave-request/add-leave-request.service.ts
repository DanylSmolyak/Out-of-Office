import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LeaveRequest } from "../shared/Models/LeaveRequest";
import {Project} from "../shared/Models/Project";

@Injectable({
  providedIn: 'root'
})
export class AddLeaveRequestService {
  private baseUrl = 'http://localhost:5106/api/LeaveRequests'; // Corrected URL

  constructor(private http: HttpClient) {}

  addLeaveRequest(newLeaveRequest: LeaveRequest): Observable<LeaveRequest> {
    console.log('Making HTTP POST request to:', this.baseUrl); // Log URL
    return this.http.post<LeaveRequest>(this.baseUrl, newLeaveRequest);
  }

  getLeaveRequest(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}`);
  }
}
