using Core.Entities;

namespace Core.Specifications;

public class EmployeeSpecifications : BaseSpecification<Employee>
{
    public EmployeeSpecifications(EmploySpecParams employeeParams)
        : base(x =>
            (string.IsNullOrEmpty(employeeParams.Search) || x.FullName.ToLower().Contains(employeeParams.Search)) &&
            (!employeeParams.Status.HasValue || x.Status == employeeParams.Status)
        )
    {
        ApplySorting(employeeParams.Sort);

    }
    
    private void ApplySorting(string sort)
    {
        if (!string.IsNullOrEmpty(sort))
        {
            switch (sort)
            {
                case "OutOfOfficeBalanceAsc":
                    AddOrderBy(p => p.OutOfOfficeBalance); // Пример сортировки по балансу отпускных дней
                    break;
                case "OutOfOfficeBalanceDesc":
                    AddOrderByDescending(p => p.OutOfOfficeBalance); // Сортировка по убыванию баланса отпускных дней
                    break;
                case "nameAsc":
                    AddOrderBy(p => p.FullName); // Сортировка по имени в алфавитном порядке
                    break;
                case "nameDesc":
                    AddOrderByDescending(p => p.FullName); // Сортировка по имени в обратном алфавитном порядке
                    break;
                default:
                    AddOrderBy(p => p.Id); // По умолчанию сортируем по Id
                    break;
            }
        }
        else
        {
            AddOrderBy(p => p.Id); // По умолчанию сортируем по Id
        }
    }
}
