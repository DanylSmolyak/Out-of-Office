
using Core.Entities;

namespace Core.Specifications
{
    public class LeaveRequestSpecification : BaseSpecification<LeaveRequest>
    {
        public LeaveRequestSpecification(LeaveRequestSpecParams leaveRequestParams)
            : base(x =>
                (string.IsNullOrEmpty(leaveRequestParams.Search) || x.Id.ToString().Contains(leaveRequestParams.Search)) &&
                (!leaveRequestParams.Status.HasValue || x.Status == leaveRequestParams.Status)
            )
        {
            ApplySorting(leaveRequestParams.Sort);
        }

        private void ApplySorting(string sort)
        {
            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "startDateAsc":
                        AddOrderBy(p => p.StartDate);
                        break;
                    case "startDateDesc":
                        AddOrderByDescending(p => p.StartDate);
                        break;
                    case "endDateAsc":
                        AddOrderBy(p => p.EndDate);
                        break;
                    case "endDateDesc":
                        AddOrderByDescending(p => p.EndDate);
                        break;
                    case "statusAsc":
                        AddOrderBy(p => p.Status);
                        break;
                    case "statusDesc":
                        AddOrderByDescending(p => p.Status);
                        break;
                    default:
                        AddOrderBy(p => p.Id);
                        break;
                }
            }
            else
            {
                AddOrderBy(p => p.Id);
            }
        }
    }
}
