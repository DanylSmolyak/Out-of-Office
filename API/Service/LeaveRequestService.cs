using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using System.Threading.Tasks;
using API.Dtos;
using Infrastructure.Data;

namespace API.Service
{
  public class LeaveRequestService : ILeaveRequestService
{
    private readonly IGenericRepository<LeaveRequest> _leaveRequestRepository;
    private readonly IGenericRepository<ApprovalRequest> _approvalRequestRepository;
    private readonly IGenericRepository<Employee> _employeeRepository;
    private readonly IMapper _mapper;
    private readonly AppDbContext _dbContext;

    public LeaveRequestService(
        IGenericRepository<LeaveRequest> leaveRequestRepository,
        IGenericRepository<ApprovalRequest> approvalRequestRepository,
        IGenericRepository<Employee> employeeRepository,
        IMapper mapper,
        AppDbContext dbContext)
    {
        _leaveRequestRepository = leaveRequestRepository;
        _approvalRequestRepository = approvalRequestRepository;
        _employeeRepository = employeeRepository;
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<bool> HandleLeaveRequestAsync(int leaveRequestId, bool isApprove)
    {
        using var transaction = await _dbContext.Database.BeginTransactionAsync();

        try
        {
            var leaveRequest = await _leaveRequestRepository.GetByIdAsync(leaveRequestId);
            if (leaveRequest == null)
            {
                return false;
            }

            if (isApprove)
            {
                await ProcessApproval(leaveRequest);
            }
            else
            {
                await CancelLeaveRequestAsync(leaveRequestId);
            }

            await transaction.CommitAsync();
            return true;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            return false;
        }
    }

    private async Task ProcessApproval(LeaveRequest leaveRequest)
    {
        var employee = await _employeeRepository.GetByIdAsync(leaveRequest.EmployeeId);
        if (employee == null)
        {
            throw new Exception("Employee not found");
        }

        int daysOfAbsence = (int)(leaveRequest.EndDate - leaveRequest.StartDate).TotalDays;
        employee.OutOfOfficeBalance -= daysOfAbsence;
        await _employeeRepository.UpdateAsync(employee);

        leaveRequest.Status = LeaveRequestStatus.Submit;
        await _leaveRequestRepository.UpdateAsync(leaveRequest);

        var approvalRequestDto = new ApprovalRequstToDto
        {
            ApproverId = leaveRequest.EmployeeId,
            LeaveRequestId = leaveRequest.Id,
            Status = (int)ApprovalStatus.Approved,
            Comment = "Leave request approved"
        };

        var approvalRequest = _mapper.Map<ApprovalRequest>(approvalRequestDto);
        await _approvalRequestRepository.AddAsync(approvalRequest);
    }
    

    public async Task<bool> CancelLeaveRequestAsync(int leaveRequestId)
    {

            var leaveRequest = await _leaveRequestRepository.GetByIdAsync(leaveRequestId);

            leaveRequest.Status = LeaveRequestStatus.Cancel;
            await _leaveRequestRepository.UpdateAsync(leaveRequest);

            var approvalRequests = await _approvalRequestRepository.ListAllAsync(); // Получаем все записи
            var relatedApprovalRequests = approvalRequests.FirstOrDefault(ar => ar.LeaveRequestId == leaveRequest.Id); // Фильтруем вручную
            
            relatedApprovalRequests.Status = ApprovalStatus.Rejected;
            await _approvalRequestRepository.UpdateAsync(relatedApprovalRequests);


            return true;
    }
    
}

}
