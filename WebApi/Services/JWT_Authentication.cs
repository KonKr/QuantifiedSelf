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
    public static class JWT_Authentication
    {
        private static Claim[] ClaimsData { get; set; }
        private static SymmetricSecurityKey Key { get; set; }
        private static SigningCredentials SigningCredentials { get; set; }


        public static String GetToken(String name)
        {
            //First produce the JWT Token Object...
            var tokenObj = ProduceTokenObject(name);
            var tokenStr = ProduceTokenString(tokenObj);
            return tokenStr;
        }

        private static JwtSecurityToken ProduceTokenObject(String name)
        {
            //Define Values...
            ClaimsData = new[] {
                new Claim(ClaimTypes.Name, name)
            };
            Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("prepei_na_vroume_ena_kleidi_na_valoume_edw"));
            SigningCredentials = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256Signature);

            var JWT_Token_Object = new JwtSecurityToken(
                issuer: "Moi",
                audience: "Toi",
                expires: DateTime.Now.AddMinutes(1),
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
