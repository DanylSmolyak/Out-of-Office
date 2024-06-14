using Core.Entities;

namespace Core.Specifications;
public class ProjectSpecifications : BaseSpecification<Project>
{
    public ProjectSpecifications(ProjectSpecParams projectsParams)
        : base(x =>
            (string.IsNullOrEmpty(projectsParams.Search) || x.Id.ToString().Contains(projectsParams.Search)) &&
            (!projectsParams.Status.HasValue || x.Status == projectsParams.Status)
        )
    {
        ApplySorting(projectsParams.Sort);
        ApplyPaging(projectsParams.PageIndex * projectsParams.PageSize, projectsParams.PageSize); // Пагинация
    }

    private void ApplySorting(string sort)
    {
        if (!string.IsNullOrEmpty(sort))
        {
            switch (sort)
            {
                case "StartDateAsc":
                    AddOrderBy(p => p.StartDate);
                    break;
                case "StartDateDesc":
                    AddOrderByDescending(p => p.StartDate);
                    break;
                case "EndDateAsc":
                    AddOrderBy(p => p.EndDate);
                    break;
                case "EndDateDesc":
                    AddOrderByDescending(p => p.EndDate);
                    break;
                default:
                    AddOrderBy(p => p.Id);
                    break;
            }
        }
        else
        {
            AddOrderBy(p => p.Id); // По умолчанию сортируем по Id
        }
    }
}
