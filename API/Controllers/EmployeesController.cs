using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
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
        public async Task<ActionResult<IReadOnlyList<EmployeeToReturnDto>>> GetEmployees()
        {
            var employees = await _contextRepo.ListAllAsync();
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
        public async Task<ActionResult> AddEmployee(Employee employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee cannot be null");
            }

            await _contextRepo.AddAsync(employee);
            var employeeDto = _mapper.Map<EmployeeToReturnDto>(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employeeDto);
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