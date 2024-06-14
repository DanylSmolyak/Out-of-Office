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

        public LeaveRequestsController(IGenericRepository<LeaveRequest> contextRepo, IMapper mapper)
        {
            _contextRepo = contextRepo;
            _mapper = mapper;
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
            if (leaveRequestDto == null)
            {
                return BadRequest("LeaveRequest cannot be null");
            }

            var leaveRequest = _mapper.Map<LeaveRequest>(leaveRequestDto);
            await _contextRepo.AddAsync(leaveRequest);

            var createdLeaveRequestDto = _mapper.Map<LeaveRequestToDto>(leaveRequest);

            return CreatedAtAction(nameof(GetLeaveRequest), new { id = leaveRequest.Id }, createdLeaveRequestDto);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLeaveRequest(int id, LeaveRequest leaveRequest)
        {
            await _contextRepo.UpdateAsync(leaveRequest);
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
