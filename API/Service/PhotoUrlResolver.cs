using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Service
{
    public class PhotoUrlResolver : IValueResolver<Employee, EmployeeToReturnDto, string>
    {
        private readonly IConfiguration _config;

        public PhotoUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Employee source, EmployeeToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.Photo))
            {
                return _config["ApiUrl"] + source.Photo;
            }

            return null;
        }
    }
}