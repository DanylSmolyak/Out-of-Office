using System.Text.Json;
using System.Text.Json.Serialization;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Entities;

namespace Infrastructure.Data
{
    public class ApiContextSeed
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            };

            if (!context.Employees.Any())
            {
                var employeesData = File.ReadAllText("../Infrastructure/Data/SeedData/employees.json");
                var employees = JsonSerializer.Deserialize<List<Employee>>(employeesData, options);
                context.Employees.AddRange(employees);
            }

            /*if (!context.LeaveRequests.Any())
            {
                var leaveRequestsData = File.ReadAllText("../Infrastructure/Data/SeedData/leaveRequests.json");
                var leaveRequests = JsonSerializer.Deserialize<List<LeaveRequest>>(leaveRequestsData, options);
                context.LeaveRequests.AddRange(leaveRequests);
            }

            if (!context.ApprovalRequests.Any())
            {
                var approvalRequestsData = File.ReadAllText("../Infrastructure/Data/SeedData/approvalRequests.json");
                var approvalRequests = JsonSerializer.Deserialize<List<ApprovalRequest>>(approvalRequestsData, options);
                context.ApprovalRequests.AddRange(approvalRequests);
            }

            if (!context.Projects.Any())
            {
                var projectsData = File.ReadAllText("../Infrastructure/Data/SeedData/projects.json");
                var projects = JsonSerializer.Deserialize<List<Project>>(projectsData, options);
                context.Projects.AddRange(projects);
            }*/

            if (context.ChangeTracker.HasChanges())
            {
                await context.SaveChangesAsync();
            }
        }
    }
}
