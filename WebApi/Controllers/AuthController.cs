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

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Auth")]
    public class AuthController : Controller
    {
        [Route("Token")]
        [HttpGet]
        public IActionResult Token()
        {
            var claimsData = new[] { new Claim(ClaimTypes.Name, "kapoios"), new Claim(ClaimTypes.PrimarySid, "adsfasdffwfw") };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("helloworldasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"));
            var signInCred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                    issuer: "Moi",
                    audience: "Moi",
                    expires: DateTime.Now.AddMinutes(1),
                    claims: claimsData,
                    signingCredentials: signInCred
                );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(tokenString);
        }
    }
}