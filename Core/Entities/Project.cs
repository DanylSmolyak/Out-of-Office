using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Project
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string ProjectType { get; set; }
    
    [Required]
    public DateTime StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
    
    [ForeignKey("ProjectManager")]
    [Required]
    public int ProjectManagerId { get; set; }
    
    public Employee ProjectManager { get; set; }
    
    public string Comment { get; set; }
    
    [Required]
    public ProjectStatus Status { get; set; }
}

public enum ProjectStatus
{
    Active = 0,
    Inactive = 1
}