using Core.Entities;

namespace API.Dtos;

public class ApprovalRequstToDto
{
    public int Id { get; set; }
    public int ApproverId { get; set; }
    
    public int LeaveRequestId { get; set; }
    
    public int Status { get; set; }
    
    public string Comment { get; set; }
}