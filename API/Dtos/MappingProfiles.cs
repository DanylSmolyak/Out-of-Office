using API.Service;
using AutoMapper;
using Core.Entities;

namespace API.Dtos;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Employee, EmployeeToReturnDto>()
            .ForMember(dest => dest.PeoplePartnerId, opt => opt.MapFrom(src => src.PeoplePartnerId))
            .ForMember(d => d.Photo, o => o.MapFrom<PhotoUrlResolver>());
        CreateMap<EmployeeToReturnDto, Employee>();
            
        CreateMap<LeaveRequest, LeaveRequestToDto>()
            .ForMember(d => d.EmployeeId, o => o.MapFrom(s => s.EmployeeId));
        CreateMap<LeaveRequestToDto, LeaveRequest>();
        
        
        CreateMap<Project, ProjectToReturnDto>()
            .ForMember(d => d.ProjectManagerId, o => o.MapFrom(s => s.ProjectManagerId));
        CreateMap<ProjectToReturnDto, Project>();

        CreateMap<ApprovalRequest, ApprovalRequstToDto>()
            .ForMember(d => d.ApproverId, o => o.MapFrom(s => s.ApproverId))
            .ForMember(d => d.LeaveRequestId, o => o.MapFrom(s => s.LeaveRequestId));
        CreateMap<ApprovalRequstToDto, ApprovalRequest>();
    }
}