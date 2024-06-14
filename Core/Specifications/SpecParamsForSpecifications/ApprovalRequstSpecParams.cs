using Core.Entities;

namespace Core.Specifications;

public class ApprovalRequstSpecParams : BaseSpecParams
{
    public ApprovalStatus? Status { get; set; }
}