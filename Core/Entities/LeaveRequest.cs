using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class LeaveRequest
{
    [Key]
    public int Id { get; set; }
    
    [ForeignKey("Employee")]
    [Required]
    public int EmployeeId { get; set; }
    
    public Employee Employee { get; set; }
    
    [Required]
    public string AbsenceReason { get; set; }
    
    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime EndDate { get; set; }
    
    public string Comment { get; set; }
    
    [Required]
    public LeaveRequestStatus Status { get; set; } = LeaveRequestStatus.New;
    
    public ApprovalRequest ApprovalRequest { get; set; }
    
}

public enum LeaveRequestStatus
{
    New=0,
    Submit = 1 ,
    Cancel = 2 
}