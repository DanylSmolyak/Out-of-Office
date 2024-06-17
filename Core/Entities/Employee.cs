using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Employee
{
[Key]
public int Id { get; set; }

[Required]
public string FullName { get; set; }

[Required]
public string Subdivision { get; set; }

[Required]
public string Position { get; set; }

[Required]
public EmployeeStatus Status { get; set; }

[ForeignKey("PeoplePartner")]
public int PeoplePartnerId { get; set; }

public Employee? PeoplePartner { get; set; }

[Required]
public int OutOfOfficeBalance { get; set; }

public string Photo { get; set; }

}

public enum EmployeeStatus
{
Active,
Inactive
}