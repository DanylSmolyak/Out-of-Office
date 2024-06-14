using System.Linq.Expressions;

namespace Core.Specifications;

public interface ISpecifications<T>
{
    Expression<Func<T, bool>> Criteria { get; set; }
    List<Expression<Func<T, object>>> Includes { get; set; }
    Expression<Func<T, object>> OrderBy { get; }
    Expression<Func<T, object>> OrderByDescending { get; }
    
    int Skip { get; set; }
    
    int Take { get; set; }
    
    bool IsPagingEnabled { get; set; }
}