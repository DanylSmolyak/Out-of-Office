import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApprovalRequst} from "../shared/Models/ApprovalRequst";


@Injectable({
  providedIn: 'root'
})
export class ApprovalRequestService {
  private baseUrl = 'http://localhost:5106/api/ApprovalRequests'; // Замените на ваш URL API

  constructor(private http: HttpClient) {}

  getApprovalRequests(sort: string, status: number | undefined,searchTerm:string): Observable<ApprovalRequst[]> {
    let params = new HttpParams();
    if (sort) params = params.append('sort', sort);
    if (status !== undefined) params = params.append('status', status.toString());
    if (searchTerm) params = params.append('search', searchTerm);
    return this.http.get<ApprovalRequst[]>(this.baseUrl, { params });
  }

  deleteApprovalRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getStatusText(status: number): string {
    return status === 1 ? 'Inactive' : 'Active';
  }

  getApprovalRequestById(id: number): Observable<ApprovalRequst> {
    return this.http.get<ApprovalRequst>(`${this.baseUrl}/${id}`);
  }

  updateApprovalRequest(approvalRequest: ApprovalRequst): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${approvalRequest.id}`, approvalRequest);
  }
}
