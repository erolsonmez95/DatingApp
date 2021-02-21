using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    // implements baseapicontroller because we dont want repeat our self
    // by using again and again ;
    /*
    [ApiController]
   [Route("api/[controller]")]
    */



    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;


        }
        // use async methods for database calls
        // because if there are lots of request with out async, our system may break down.

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUser()
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);

        }


        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
          return await _userRepository.GetMemberAsync(username);
  
        }
    }
}