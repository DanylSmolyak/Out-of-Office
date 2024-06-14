using Core.Entities;

namespace Core.Specifications;

public class EmploySpecParams : BaseSpecParams
{
    public EmployeeStatus? Status { get; set; }
}