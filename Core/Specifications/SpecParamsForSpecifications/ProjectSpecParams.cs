using Core.Entities;

namespace Core.Specifications;

public class ProjectSpecParams : BaseSpecParams
{
    public ProjectStatus? Status { get; set; }
}