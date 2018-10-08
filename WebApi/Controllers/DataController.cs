using System;
using System.Collections.Generic;
using System.Globalization;
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
        public IActionResult GetData(int? rowsToExpect, string variableToGet, string dateToStart, string dateToFinish)
        {
            try
            {
                //Initializing variables for this scope...
                DateTime dateToStart_Date;
                DateTime dateToFinish_Date;
                List<DbDataRetrievalInstance_Model> db_data;

                if (dateToStart != null && dateToFinish != null && rowsToExpect == null)//If time span mode is selected....
                {
                    dateToStart_Date = DateTime.ParseExact(dateToStart, "dd-MM-yyyy", new CultureInfo("el"));
                    dateToFinish_Date = DateTime.ParseExact(dateToFinish, "dd-MM-yyyy", new CultureInfo("el"));

                    if (dateToStart_Date >= Convert.ToDateTime("2011-10-22") && dateToFinish_Date <= Convert.ToDateTime("2014-09-29"))
                    {
                        if (dateToStart_Date.AddDays(13) <= dateToFinish_Date)//If the time period between two dates is less than 12 days, return bad request due to anomaly identifier...
                        {
                            //Retrieve data from database for a specific variable, and to be returned with a number of rows...
                            db_data = repo.GetDataFromDbForGivenVariable_TimePeriod(variableToGet, dateToStart_Date, dateToFinish_Date);
                        }
                        else
                            return BadRequest("Time period must be over 13 days.");
                    }
                    else
                        return BadRequest("Dates must be between 2011-10-22 and 2014-09-29.");
                    
                }
                else if (dateToStart == null && dateToFinish == null && rowsToExpect != null) //If rowsToExpect is selected...
                {
                    if (rowsToExpect >= 12)//requirement for anomaly identifier...
                    {
                        //Retrieve data from database for a specific variable, and to be returned with a number of rows...
                        db_data = repo.GetDataFromDbForGivenVariable(rowsToExpect.Value, variableToGet);
                    }
                    else
                        return BadRequest("rowsToExpect must be equal or greater than 12.");
                }
                else
                {
                    return BadRequest("Please use either dateToStart & dateToFinish or rowsToExpect along with variableToGet");
                }

                //Convert data to be compatible with Azure Anomaly identifier api...
                var normalized_data = repo.NormalizeDataForAAI(db_data);

                //Analyze data with the Azure Anomaly Identifier Api...
                var analysis_data = aiService.AnalyzeData(normalized_data);

                //Create data to return...
                var res = repo.GenerateDataForGraph(analysis_data.Result, db_data);

                return Ok(res);

            }
            catch (Exception e)
            {
                return StatusCode(500);
            }
        }


        ////[Authorize]
        ////[Route("api/Data/Timespan")]
        ////[HttpGet]
        //public IActionResult GetDataAlternative(string variableToGet, string dateToStart, string dateToFinish)
        //{
        //    try
        //    {
        //        DateTime dateToStart_Date = Convert.ToDateTime(dateToStart);
        //        DateTime dateToFinish_Date = Convert.ToDateTime(dateToFinish);

        //        if (dateToStart_Date.AddDays(13) <= dateToFinish_Date)//If the time period between two dates is less than 12 days, return bad request due to anomaly identifier...
        //        {
        //            //Retrieve data from database for a specific variable, and to be returned with a number of rows...
        //            var db_data = repo.GetDataFromDbForGivenVariable_TimePeriod(variableToGet, dateToStart_Date, dateToFinish_Date);

        //            //Convert data to be compatible with Azure Anomaly identifier api...
        //            var normalized_data = repo.NormalizeDataForAAI(db_data);

        //            //Analyze data with the Azure Anomaly Identifier Api...
        //            var analysis_data = aiService.AnalyzeData(normalized_data);

        //            //Create data to return...
        //            var res = repo.GenerateDataForGraph(analysis_data.Result, db_data);

        //            return Ok(res);
        //        }
        //        else
        //        {
        //            return BadRequest("Time period must be over 13 days.");
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        return StatusCode(500);
        //    }
        //}

    }
}