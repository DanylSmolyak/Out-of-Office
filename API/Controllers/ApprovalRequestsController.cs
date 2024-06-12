using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ApprovalRequestsController : BaseApiController
{
    private readonly IGenericRepository<ApprovalRequest> _contextRepo;
    private readonly IMapper _mapper;

    public ApprovalRequestsController(IGenericRepository<ApprovalRequest> contextRepo, IMapper mapper)
    {
        _contextRepo = contextRepo;
        _mapper = mapper;
    }
    
      [HttpGet]
      public async Task<ActionResult<IReadOnlyList<ApprovalRequstToDto>>> GetApprovalRequests()
      {
          var  approvalRequests = await _contextRepo.ListAllAsync();
          var approvalRequestsDtos = _mapper.Map<IReadOnlyList<ApprovalRequstToDto>>(approvalRequests);     
          return Ok(approvalRequestsDtos);
      }
            
      [HttpGet("{id}")]
      public async Task<ActionResult<ApprovalRequstToDto>> GetApprovalRequest(int id) {
          var  approvalRequest = await _contextRepo.GetByIdAsync(id);
    
          if (approvalRequest == null)
          {
                    return NotFound();
          }
          var approvalRequestsDtos = _mapper.Map<ApprovalRequstToDto>(approvalRequest);
          return Ok(approvalRequestsDtos);
      }
      
      [HttpPost]
      public async Task<ActionResult<ApprovalRequstToDto>> AddApprovalRequest(ApprovalRequstToDto approvalRequestDto)
      {
          if (approvalRequestDto == null)
          {
              return BadRequest("ApprovalRequest cannot be null");
          }
          
          var approvalRequest = _mapper.Map<ApprovalRequest>(approvalRequestDto);
          
          await _contextRepo.AddAsync(approvalRequest);
          
          var createdApprovalRequestDto = _mapper.Map<ApprovalRequstToDto>(approvalRequest);

          return CreatedAtAction(nameof(GetApprovalRequest), new { id = approvalRequest.Id }, createdApprovalRequestDto);
      }
    
      [HttpPut("{id}")]
      public async Task<ActionResult> UpdateApprovalRequest(int id, ApprovalRequest approvalRequest)
      {
          await _contextRepo.UpdateAsync(approvalRequest);
          return NoContent();
      }
      
      [HttpDelete("{id}")]
      public async Task<ActionResult> DeleteApprovalRequest(int id)
      {
          var approvalRequest = await _contextRepo.GetByIdAsync(id);
          if (approvalRequest == null)
          {
              return NotFound();
          }
    
          await _contextRepo.RemoveAsync(approvalRequest);
          return NoContent();
      }
    

}