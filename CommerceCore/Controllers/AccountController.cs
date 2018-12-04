using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CommerceCore.DAL;
using CommerceCore.Models;
using CommerceCore.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CommerceCore.Controllers
{
    public class Credentials
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
    [Produces("application/json")]
    [Route("api/Account")]
    [ApiController]
    public class AccountController : Controller
    {
        readonly UserDBContext _userDBContext;
        readonly UserManager<AppUser> _userManager;
        readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, IMapper mapper, UserDBContext userDBContext)
        {
            _userDBContext = userDBContext;
            _userManager = userManager;
            _mapper = mapper;
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<AppUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(result);

            await _userDBContext.Customers.AddAsync(new Customer { IdentityId = userIdentity.Id, Location = model.Location });
            await _userDBContext.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }

        //[HttpPost]
        //public async Task<IActionResult> Register([FromBody] Credentials credentials)
        //{
        //    var user = new IdentityUser { UserName = credentials.Email, Email = credentials.Email };
        //    var result = await userManager.CreateAsync(user, credentials.Password);
        //    if (!result.Succeeded)
        //        return BadRequest(result.Errors);
        //    await signInManager.SignInAsync(user, isPersistent: false);
        //    var jwt = new JwtSecurityToken();
        //    return Ok(new JwtSecurityTokenHandler().WriteToken(jwt));
        //}

    }
}