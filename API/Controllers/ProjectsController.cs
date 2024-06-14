using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProjectsController : BaseApiController
{
    private readonly IGenericRepository<Project> _contextRepo;
    private readonly IMapper _mapper;

    public ProjectsController(IGenericRepository<Project> contextRepo,IMapper mapper)
    {
        _contextRepo = contextRepo;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProjectToReturnDto>>> GetProjects([FromQuery] ProjectSpecParams projectParams)
    {
        var spec = new ProjectSpecifications(projectParams);
        var projects = await _contextRepo.ListAsync(spec);
        var projectsDtos = _mapper.Map<IReadOnlyList<ProjectToReturnDto>>(projects);

        return Ok(projectsDtos);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectToReturnDto>> GetProject(int id)
    {
        var project = await _contextRepo.GetByIdAsync(id);

        if (project == null)
        {
            return NotFound();
        }
        var projectsDtos = _mapper.Map<ProjectToReturnDto>(project);
        return Ok(projectsDtos);
    }
    [HttpPost]
    public async Task<ActionResult<LeaveRequestToDto>>  AddProject(ProjectToReturnDto projectsDtos)
    {
        if (projectsDtos == null)
        {
            return BadRequest("Employee cannot be null");
        }
        var project = _mapper.Map<Project>(projectsDtos);
        await _contextRepo.AddAsync(project);
        var createdProjectsDtos = _mapper.Map<ProjectToReturnDto>(project);
        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, createdProjectsDtos);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateProject(int id, Project project)
    {
        await _contextRepo.UpdateAsync(project);
        return NoContent();
    }
        
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteEmployee(int id)
    {
        var project = await _contextRepo.GetByIdAsync(id);
        if (project == null)
        {
            return NotFound();
        }

        await _contextRepo.RemoveAsync(project);
        return NoContent();
    }
}