using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Specifications;

namespace API.Controllers
{
    public class LeaveRequestsController : BaseApiController
    {
        private readonly IGenericRepository<LeaveRequest> _contextRepo;
        private readonly IMapper _mapper;
        private readonly ILeaveRequestService _leaveRequestService;

        public LeaveRequestsController(IGenericRepository<LeaveRequest> contextRepo, IMapper mapper, ILeaveRequestService leaveRequestService)
        {
            _contextRepo = contextRepo;
            _mapper = mapper;
            _leaveRequestService = leaveRequestService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<LeaveRequestToDto>>> GetLeaveRequests([FromQuery] LeaveRequestSpecParams leaveRequestParams)
        {
            var spec = new LeaveRequestSpecification(leaveRequestParams);
            var leaveRequests = await _contextRepo.ListAsync(spec);
            var leaveRequestDtos = _mapper.Map<IReadOnlyList<LeaveRequestToDto>>(leaveRequests);

            return Ok(leaveRequestDtos);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveRequestToDto>> GetLeaveRequest(int id)
        {
            
            var leaveRequest = await _contextRepo.GetByIdAsync(id);

            if (leaveRequest == null)
            {
                return NotFound();
            }
            
            var leaveRequestDto = _mapper.Map<LeaveRequestToDto>(leaveRequest);


            return Ok(leaveRequestDto);
        }
        
        [HttpPost]
        public async Task<ActionResult<LeaveRequestToDto>> AddLeaveRequest(LeaveRequestToDto leaveRequestDto)
        {

            var leaveRequest = _mapper.Map<LeaveRequest>(leaveRequestDto);
            await _contextRepo.AddAsync(leaveRequest);

            var createdLeaveRequestDto = _mapper.Map<LeaveRequestToDto>(leaveRequest);

            return CreatedAtAction(nameof(GetLeaveRequest), new { id = leaveRequest.Id }, createdLeaveRequestDto);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLeaveRequest(int id, LeaveRequestToDto leaveRequestDto)
        {
            var leaveRequest = await _contextRepo.GetByIdAsync(id);
            if (leaveRequest == null)
            {
                return NotFound();
            }

            // Map updated properties from DTO to entity
            _mapper.Map(leaveRequestDto, leaveRequest);

            // Explicitly set EmployeeID if needed
            leaveRequest.EmployeeId = leaveRequestDto.EmployeeId;

            await _contextRepo.UpdateAsync(leaveRequest);

            // Check if the leave request status should be approved or canceled
            if (leaveRequest.Status == LeaveRequestStatus.Submit)
            {
                var result = await _leaveRequestService.HandleLeaveRequestAsync(id, true);

                if (!result)
                {
                    return BadRequest("Failed to approve leave request.");
                }
            }
            else if (leaveRequest.Status == LeaveRequestStatus.Cancel)
            {
                var result = await _leaveRequestService.HandleLeaveRequestAsync(id, false);

                if (!result)
                {
                    return BadRequest("Failed to cancel leave request.");
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLeaveRequest(int id)
        {
            var leaveRequest = await _contextRepo.GetByIdAsync(id);
            if (leaveRequest == null)
            {
                return NotFound();
            }

            await _contextRepo.RemoveAsync(leaveRequest);
            return NoContent();
        }
    }
}
