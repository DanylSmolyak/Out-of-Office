using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.Property(e => e.Id).IsRequired();
        builder.Property(e => e.FullName).IsRequired();
        builder.Property(e => e.Subdivision).IsRequired();
        builder.Property(e => e.Position).IsRequired();
        builder.Property(e => e.Status).IsRequired();
        builder.Property(e => e.OutOfOfficeBalance).IsRequired();
        builder.Property(e => e.Photo);

        builder.HasOne(e => e.PeoplePartner)
            .WithMany()
            .HasForeignKey(e => e.PeoplePartnerId)
            .OnDelete(DeleteBehavior.Restrict);

        /*
        builder.HasMany(e => e.LeaveRequests)
            .WithOne(lr => lr.Employee)
            .HasForeignKey(lr => lr.EmployeeId);

        builder.HasMany(e => e.ApprovalRequests)
            .WithOne(ar => ar.Approver)
            .HasForeignKey(ar => ar.ApproverId);*/
    }
}

public class LeaveRequestConfiguration : IEntityTypeConfiguration<LeaveRequest>
{
    public void Configure(EntityTypeBuilder<LeaveRequest> builder)
    {
        builder.Property(lr => lr.Id).IsRequired();
        builder.Property(lr => lr.AbsenceReason).IsRequired();
        builder.Property(lr => lr.StartDate).IsRequired();
        builder.Property(lr => lr.EndDate).IsRequired();
        builder.Property(lr => lr.Status).IsRequired();

        /*builder.HasMany(lr => lr.ApprovalRequests)
            .WithOne(ar => ar.LeaveRequest)
            .HasForeignKey(ar => ar.LeaveRequestId);*/
    }
}

public class ApprovalRequestConfiguration : IEntityTypeConfiguration<ApprovalRequest>
{
    public void Configure(EntityTypeBuilder<ApprovalRequest> builder)
    {
        builder.HasKey(ar => ar.Id); // Устанавливаем Id как первичный ключ

        builder.Property(ar => ar.Id).IsRequired(); // Устанавливаем, что Id обязателен

        builder.Property(ar => ar.Status).IsRequired(); // Устанавливаем, что статус обязателен


       
        builder.HasOne(ar => ar.LeaveRequest)
            .WithOne(lr => lr.ApprovalRequest) // Связь один к одному
            .HasForeignKey<ApprovalRequest>(ar => ar.LeaveRequestId) // Устанавливаем внешний ключ
            .OnDelete(DeleteBehavior.Restrict);
    }
}

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.Property(p => p.Id).IsRequired();
        builder.Property(p => p.ProjectType).IsRequired();
        builder.Property(p => p.StartDate).IsRequired();
        builder.Property(p => p.Status).IsRequired();

        builder.HasOne(p => p.ProjectManager)
            .WithMany()
            .HasForeignKey(p => p.ProjectManagerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
