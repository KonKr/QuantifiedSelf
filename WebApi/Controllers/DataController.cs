using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Produces("application/json")]    
    public class DataController : Controller
    {
        //TODO: Implement time depth througth URI parameters...
        [Authorize]
        [Route("api/Data")]
        [HttpGet]
        public IActionResult GetData()
        {
            //var userName = User.Identity.Name; //get authorized user's username...

            var db = new Quantified_Self_DBContext();
            var res = db.FitBitData.Take(50).ToList();
            return Ok(res);
        }

    }
}