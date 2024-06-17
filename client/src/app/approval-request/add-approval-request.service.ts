import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LeaveRequest } from "../shared/Models/LeaveRequest";
import {ApprovalRequst} from "../shared/Models/ApprovalRequst";

@Injectable({
  providedIn: 'root'
})
export class AddApprovalRequestService {
  private baseUrl = 'http://localhost:5106/api/ApprovalRequests'; // Corrected URL

  constructor(private http: HttpClient) {}

  addApprovalRequest(newApprovalRequest: ApprovalRequst): Observable<ApprovalRequst> {
    console.log('Making HTTP POST request to:', this.baseUrl); // Log URL
    return this.http.post<ApprovalRequst>(this.baseUrl, newApprovalRequest);
  }

  getApprovalRequest(): Observable<ApprovalRequst[]> {
    return this.http.get<ApprovalRequst[]>(`${this.baseUrl}`);
  }
}
