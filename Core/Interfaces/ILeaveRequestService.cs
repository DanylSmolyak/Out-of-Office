namespace Core.Interfaces;

public interface ILeaveRequestService
{
    Task<bool> CancelLeaveRequestAsync(int leaveRequestId);
    
    Task<bool> HandleLeaveRequestAsync(int leaveRequestId, bool isApprove);
    
    
}
