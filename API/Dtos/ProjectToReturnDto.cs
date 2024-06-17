using Core.Entities;

namespace API.Dtos;

public class ProjectToReturnDto
{
    public int Id { get; set; }
    public string ProjectType { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
    
    public int ProjectManagerId { get; set; }
    
    public string Comment { get; set; }
    
    public int Status { get; set; }
}