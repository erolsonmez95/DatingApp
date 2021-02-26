using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        public void Update(AppUser user);

        public Task<bool> SaveAllAsync();

        public Task<IEnumerable<AppUser>> GetUsersAsync();

        public Task<AppUser> GetUserByIdAsync(int id);

        public Task<AppUser> GetUserByUsernameAsync(string userName);

        public Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        public Task<MemberDto> GetMemberAsync(string username);
        
        
    }
}