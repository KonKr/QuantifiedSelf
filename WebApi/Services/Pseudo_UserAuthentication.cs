using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.ViewModels;

namespace WebApi.Services
{
    public class Pseudo_UserAuthentication
    {
        private IConfiguration _config;
        public Pseudo_UserAuthentication(IConfiguration Configuration)
        {
            _config = Configuration;
        }        

        public KeyValuePair<bool, string> AuthenticateUser(GetToken_Credentials credentials)
        {
            try
            {
                if (credentials.Email == _config["TestProfile_Info:User_Email"] && credentials.Password == _config["TestProfile_Info:User_Password"])
                {
                    //Authentication Succesful. User Found, and returning true along with user's Id...
                    var userEmail = _config["TestProfile_Info:User_Email"];
                    return new KeyValuePair<bool, string>(true, userEmail);
                }
                else
                {
                    //Authentication Faild. User Not Found Or Wrong Credentials were given. Returning false...
                    return new KeyValuePair<bool, string>(false, String.Empty);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }


    }
}
