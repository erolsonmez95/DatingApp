using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
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
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;

        }
        // use async methods for database calls
        // because if there are lots of request with out async, our system may break down.

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUser(){
        return await _context.Users.ToListAsync();
        // to list için Linq 'ya ihtiyacımız var
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id){
       
        return await _context.Users.FindAsync(id);
        //find comes by LinQ and returns corresponding user
        // if no user then Http Code: 204 which means no content!    
        }
    }
}