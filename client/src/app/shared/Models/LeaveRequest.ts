export interface LeaveRequest {
  id: number
  employeeId: number
  absenceReason: string
  startDate: string
  endDate: string
  comment: string
  status: number
}
