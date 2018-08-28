using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Models.Azure_AnomalyIdentifier_Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    public class DataController : Controller
    {
        private Quantified_Self_DBContext db;
        private Azure_AnomalyIdentitfier aiService;
        public DataController()
        {
            db = new Quantified_Self_DBContext();
            aiService = new Azure_AnomalyIdentitfier();
        }

        //TODO: Implement time depth througth URI parameters...
        [Authorize]
        [Route("api/Data")]
        [HttpGet]
        public IActionResult GetData(int result_rows)
        {
            var db_data = db.FitBitData.Take(result_rows).ToList();

            var normalized_data = aiService.NormalizeData(db_data);

            var analysis = aiService.RequestAnalysis(normalized_data);

            return Ok(analysis.Result);

        }      

    }
}