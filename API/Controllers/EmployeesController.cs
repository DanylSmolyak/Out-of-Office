using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Specifications;
using Microsoft.AspNetCore.Http.HttpResults;

namespace API.Controllers
{
    public class EmployeesController : BaseApiController
    {
        private readonly IGenericRepository<Employee> _contextRepo;
        private readonly IMapper _mapper;

        public EmployeesController(IGenericRepository<Employee> contextRepo, IMapper mapper)
        {
            _contextRepo = contextRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<EmployeeToReturnDto>>> GetEmployees([FromQuery] EmploySpecParams EmploySpecParams)
        {
            var spec = new EmployeeSpecifications(EmploySpecParams);
            var employees = await _contextRepo.ListAsync(spec);
            var employeeDtos = _mapper.Map<IReadOnlyList<EmployeeToReturnDto>>(employees);
            
            
            return Ok(employeeDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeToReturnDto>> GetEmployee(int id)
        {
            var employee = await _contextRepo.GetByIdAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            var employeeDto = _mapper.Map<EmployeeToReturnDto>(employee);
            return Ok(employeeDto);
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeToReturnDto>> AddEmployee(EmployeeToReturnDto employeeDto)
        {
            if (employeeDto == null)
            {
                return BadRequest("Employee data is invalid");
            }

            var employee = _mapper.Map<Employee>(employeeDto);

            await _contextRepo.AddAsync(employee);

            var createdEmployeeDto = _mapper.Map<EmployeeToReturnDto>(employee);

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, createdEmployeeDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmployee(int id, Employee employee)
        {
            var existingEmployee = await _contextRepo.GetByIdAsync(id);
            if (existingEmployee == null)
            {
                return NotFound();
            }

            await _contextRepo.UpdateAsync(employee);
            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var employee = await _contextRepo.GetByIdAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            await _contextRepo.RemoveAsync(employee);
            return NoContent();
        }
    }
}