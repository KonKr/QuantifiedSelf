using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApi.Services;
using WebApi.ViewModels;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    public class AuthController : Controller
    {
        //Get Access Token in order to use other methods...
        [Route("api/Auth/Token")]
        [HttpPost]
        public IActionResult GetAuthorizationToken([FromBody] GetToken_Credentials credentials)
        {

            var token = JWT_Authentication.GetToken(credentials.Email);
            return Ok(token);
        }
    }
}