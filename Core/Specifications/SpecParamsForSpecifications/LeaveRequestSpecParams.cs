using Core.Entities;

namespace Core.Specifications;

public class LeaveRequestSpecParams : BaseSpecParams
{
    public LeaveRequestStatus? Status { get; set; } 
}