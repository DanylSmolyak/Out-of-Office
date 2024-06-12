using Core.Entities;

namespace API.Dtos;

public class ApprovalRequstToDto
{
    public int ApproverId { get; set; }
    
    public int LeaveRequestId { get; set; }
    
    public ApprovalStatus Status { get; set; } = ApprovalStatus.New;
    
    public string Comment { get; set; }
}