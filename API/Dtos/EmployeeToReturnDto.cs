using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace API.Dtos;
public class EmployeeToReturnDto
{
    public string FullName { get; set; }
    public string Subdivision { get; set; }
    public string Position { get; set; }
    public EmployeeStatus Status { get; set; }
    public int PeoplePartnerId { get; set; }
    public int OutOfOfficeBalance { get; set; }
    public string Photo { get; set; }
}

