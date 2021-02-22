using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            
            // first AppUser is source, if we need AppUser it's auto mapped to MemberDTO
            CreateMap<AppUser,MemberDto>().ForMember(dest => dest.PhotoUrl,
            opt=>opt.MapFrom(src => src.Photos.FirstOrDefault(x=> x.IsMain).Url)).ForMember(
                dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            //to fill PhotoUrl ==> which is corresponding for main profile photo.
            
            CreateMap<Photo, PhotoDto>();
            //if Photo needed, it's mapped to PhotoDto.

            CreateMap<MemberUpdateDto,AppUser>();


        }
    }
}