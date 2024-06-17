using Core.Entities;

namespace API.Dtos;

public class LeaveRequestToDto
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public string AbsenceReason { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Comment { get; set; }
    public int Status { get; set; }
}