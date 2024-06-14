using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ApprovalRequestSpecification : BaseSpecification<ApprovalRequest>
    {
        public ApprovalRequestSpecification(ApprovalRequstSpecParams approvalRequestParams)
            : base(x =>
                (string.IsNullOrEmpty(approvalRequestParams.Search) ||
                 x.Id.ToString().Contains(approvalRequestParams.Search)) &&
                (!approvalRequestParams.Status.HasValue || x.Status == approvalRequestParams.Status)
            )
        {
            ApplySorting(approvalRequestParams.Sort);
        }

        private void ApplySorting(string sort)
        {
            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "approverIdAsc":
                        AddOrderBy(p => p.ApproverId);
                        break;
                    case "approverIdDesc":
                        AddOrderByDescending(p => p.ApproverId);
                        break;
                    case "statusAsc":
                        AddOrderBy(p => p.Status);
                        break;
                    case "statusDesc":
                        AddOrderByDescending(p => p.Status);
                        break;
                    case "leaveRequestIdAsc":
                        AddOrderBy(p => p.LeaveRequestId);
                        break;
                    case "leaveRequestIdDesc":
                        AddOrderByDescending(p => p.LeaveRequestId);
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