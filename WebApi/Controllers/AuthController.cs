using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebApi.Services;
using WebApi.ViewModels;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    public class AuthController : Controller
    {
        private IConfiguration _config;
        private Pseudo_UserAuthentication GetAuth;
        private JWT_Authentication JWT_Auth;

        public AuthController(IConfiguration Configuration)
        {
            _config = Configuration;
            GetAuth = new Pseudo_UserAuthentication(_config);
            JWT_Auth = new JWT_Authentication(_config);
        }

        [HttpPost]
        [Route("api/Auth/Token")]
        public IActionResult GetAuthorizationToken([FromBody] GetToken_Credentials credentials)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //Authenticating User. Credentials and User info can be found in the configuration file...
                    var authRes = GetAuth.AuthenticateUser(credentials);

                    if (authRes.Key == true) //if authentication was successful, proceed to authorization...
                    {
                        var token = JWT_Auth.GetToken(authRes.Value);
                        return Ok(token);
                    }
                    else
                    {
                        //User not found, or wrong credentials...
                        return BadRequest(":( Wrong Credentials, or User doesn't exist. Please check them again.");
                    }
                }
                else
                {
                    //Model state is not valid, something is missing...
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }            
        }


    }
}