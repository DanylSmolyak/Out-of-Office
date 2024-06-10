using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class ApprovalRequest
{
    [Key]
    public int Id { get; set; }
    
    [ForeignKey("Approver")]
    [Required]
    public int ApproverId { get; set; }
    
    public Employee Approver { get; set; }
    
    [ForeignKey("LeaveRequest")]
    [Required]
    public int LeaveRequestId { get; set; }
    
    public LeaveRequest LeaveRequest { get; set; }
    
    [Required]
    public ApprovalStatus Status { get; set; } = ApprovalStatus.New;
    
    public string Comment { get; set; }
}

public enum ApprovalStatus
{
    New,
    Approved,
    Rejected
}
