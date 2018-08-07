using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Services
{
    public class JWT_Authentication
    {
        private IConfiguration _config;
        public JWT_Authentication(IConfiguration Configuration)
        {
            _config = Configuration;
        }

        public String GetToken(string userEmail)
        {
            //First produce the JWT Token Object...
            var tokenObj = ProduceTokenObject(userEmail);
            var tokenStr = ProduceTokenString(tokenObj);
            return tokenStr;
        }

        private JwtSecurityToken ProduceTokenObject(string userEmail)
        {
            //Define Values...
            var ClaimsData = new[] {
                new Claim(ClaimTypes.Name, userEmail)
            };
            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT_Configuration:EncryptionKey"]));
            var SigningCredentials = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256Signature);

            var expiresInMinutes = Convert.ToInt32(_config["JWT_Configuration:TokenDuration_inMinutes"]);

            var JWT_Token_Object = new JwtSecurityToken(
                issuer: _config["JWT_Configuration:Issuer"],
                audience: _config["JWT_Configuration:Audience"],
                expires: DateTime.Now.AddMinutes(expiresInMinutes),
                claims: ClaimsData,
                signingCredentials: SigningCredentials
            );
            return JWT_Token_Object;
        }

        private static String ProduceTokenString(JwtSecurityToken tokenObject)
        {
            //Produce token...
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenObject);
            return tokenString;
        }
    }
}
