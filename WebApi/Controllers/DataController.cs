using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Models.Azure_AnomalyIdentifier_Models;
using WebApi.Repositories;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    public class DataController : Controller
    {
        private Quantified_Self_DBContext db;
        private Azure_AnomalyIdentitfier aiService;
        private MainRepository repo;
        public DataController()
        {
            db = new Quantified_Self_DBContext();
            aiService = new Azure_AnomalyIdentitfier();
            repo = new MainRepository();
        }

        //TODO: Implement time depth througth URI parameters...
        [Authorize]
        [Route("api/Data")]
        [HttpGet]
        public IActionResult GetData(int rowsToExpect, string variableToGet)
        {
            try
            {
                if (rowsToExpect >=12)//requirement for anomaly identifier...
                {
                    //Retrieve data from database for a specific variable, and to be returned with a number of rows...
                    var db_data = repo.GetDataFromDbForGivenVariable(rowsToExpect, variableToGet);

                    //Convert data to be compatible with Azure Anomaly identifier api...
                    var normalized_data = repo.NormalizeDataForAAI(db_data);

                    //Analyze data with the Azure Anomaly Identifier Api...
                    var analysis_data = aiService.AnalyzeData(normalized_data);

                    //Create data to return...
                    var res = repo.GenerateDataForGraph(analysis_data.Result, db_data);

                    return Ok(res);
                }
                else
                {
                    return BadRequest("rowsToExpect must be equal or greater than 12.");
                }                
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }            
        }      

        

    }
}