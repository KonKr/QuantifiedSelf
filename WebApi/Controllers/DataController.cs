using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Models.Azure_AnomalyIdentifier_Models;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    public class DataController : Controller
    {
        private Quantified_Self_DBContext db;
        public DataController()
        {
            db = new Quantified_Self_DBContext();
        }

        //TODO: Implement time depth througth URI parameters...
        [Authorize]
        [Route("api/Data")]
        [HttpGet]
        public IActionResult GetData(int time_depth_inDays, int result_rows)
        {
            //var userName = User.Identity.Name; //get authorized user's username...

            var res = db.FitBitData.Take(50).ToList();

            if (time_depth_inDays != 0 && result_rows != 0) // cannot have both parameters not null...
                return BadRequest("Can't include both query parameters. Please choose between 'time_depth' and 'result rows'.");

            if (result_rows != 0)// if result_rows is given as a parameter, then use it to retrieve data...
            {
                var res_from_db = db.FitBitData.Take(result_rows).ToList();

                //anomaly detection for calories...
                var objToCheck = new Azure_AnomalyIdentifier_toSend_AzureApi_Model(); //create new obj...
                foreach (var db_item in res_from_db)//foreach obj retrieved from the db...
                {
                    objToCheck.Points.Add(
                        new Azure_AnomalyIdentifier_Point_Instance_Model()
                        {
                            Timestamp = "asdf",
                            Value = 4
                        });
                }
                objToCheck.Period = 7;

                return Ok(objToCheck);
            }


            if (time_depth_inDays != 0) // if time_depth is given as a paramter, then use it to retrieve data...
                return Ok(db.FitBitData.Where(w => w.Date > DateTime.Now.AddDays(time_depth_inDays * -1)).ToList());

            //if both parameters are null, then return every entry there is....
            return Ok(db.FitBitData.ToList());
        }

    }
}