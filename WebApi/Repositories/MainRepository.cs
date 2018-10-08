using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using WebApi.Models.Azure_AnomalyIdentifier_Models;
using WebApi.Models.Azure_AnomalyIdentifier_Models.Output;

namespace WebApi.Repositories
{
    public class MainRepository
    {
        private Quantified_Self_DBContext db;
        public MainRepository()
        {
            db = new Quantified_Self_DBContext();
        }

        public List<DbDataRetrievalInstance_Model> GetDataFromDbForGivenVariable(int rowsToExpect, string variableToGet)
        {
            try
            {
                switch (variableToGet.ToLower())
                {                    
                    case "calories":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Calories)
                                    })
                                    .ToList();
                    case "steps":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Steps)
                                    })
                                    .ToList();
                    case "distance":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Distance, CultureInfo.GetCultureInfo("de-DE").NumberFormat)
                                    })
                                    .ToList();
                    case "floors":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Floors)
                                    })
                                    .ToList();
                    case "elevation":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Elevation)
                                    })
                                    .ToList();
                    case "minutessedentary":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesSedentary)
                                    })
                                    .ToList();
                    case "minuteslightlyctive":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesLightlyActive)
                                    })
                                    .ToList();
                    case "minutesfairlyactive":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesFairlyActive)
                                    })
                                    .ToList();
                    case "minutesveryactive":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesVeryActive)
                                    })
                                    .ToList();
                    case "starttime":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.StartTime, CultureInfo.GetCultureInfo("de-DE").NumberFormat)
                                    })
                                    .ToList();
                    case "timeinbed":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.TimeInBed)
                                    })
                                    .ToList();
                    case "minutesasleep":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesAsleep)
                                    })
                                    .ToList();
                    case "awakeningscount":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.AwakeningsCount)
                                    })
                                    .ToList();
                    case "minutesawake":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesAwake)
                                    })
                                    .ToList();
                    case "minutestofallasleep":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesToFallAsleep)
                                    })
                                    .ToList();
                    case "minutesafterwakeup":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesAfterWakeup)
                                    }).ToList();
                    case "efficiency":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Efficiency)
                                    })
                                    .ToList();
                    case "weight":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Weight, CultureInfo.GetCultureInfo("de-DE").NumberFormat)
                                    })
                                    .ToList();
                    case "bmi":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Bmi, CultureInfo.GetCultureInfo("de-DE").NumberFormat)
                                    })
                                    .ToList();
                    case "fat":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Fat, CultureInfo.GetCultureInfo("de-DE").NumberFormat)
                                    })
                                    .ToList();                   


                    //TODO: Add more select queries...
                    default:
                        throw new Exception("variableToGet is not defined properly");
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<DbDataRetrievalInstance_Model> GetDataFromDbForGivenVariable_TimePeriod(string variableToGet, DateTime dateToStart_Date, DateTime dateToFinish_Date)
        {
            try
            {
                switch (variableToGet.ToLower())
                {
                    case "calories":
                        return db.FitBitData
                                    .Where(w=>w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Calories)
                                    })
                                    .ToList();
                    case "steps":
                        return db.FitBitData
                                    .Where(w=>w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Steps)
                                    })
                                    .ToList();
                    case "distance":
                        return db.FitBitData
                                    .Where(w=>w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Distance, CultureInfo.GetCultureInfo("de-DE").NumberFormat)
                                    })
                                    .ToList();
                    case "floors":
                        return db.FitBitData
                                    .Where(w=>w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Floors)
                                    })
                                    .ToList();
                    case "elevation":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Elevation)
                                    })
                                    .ToList();
                    case "minutessedentary":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesSedentary)
                                    })
                                    .ToList();
                    case "minuteslightlyactive":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesLightlyActive)
                                    })
                                    .ToList();
                    case "minutesfairlyactive":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesFairlyActive)
                                    })
                                    .ToList();
                    case "minutesveryactive":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesVeryActive)
                                    })
                                    .ToList();
                    case "starttime":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.StartTime, CultureInfo.GetCultureInfo("de-DE").NumberFormat)
                                    })
                                    .ToList();
                    case "timeinbed":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.TimeInBed)
                                    })
                                    .ToList();
                    case "minutesasleep":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesAsleep)
                                    })
                                    .ToList();
                    case "awakeningscount":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.AwakeningsCount)
                                    })
                                    .ToList();
                    case "minutesawake":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesAwake)
                                    })
                                    .ToList();
                    case "minutestofallasleep":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesToFallAsleep)
                                    })
                                    .ToList();
                    case "minutesafterwakeup":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.MinutesAfterWakeup)
                                    }).ToList();
                    case "efficiency":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Efficiency)
                                    })
                                    .ToList();
                    case "weight":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Weight, CultureInfo.GetCultureInfo("de-DE").NumberFormat)
                                    })
                                    .ToList();
                    case "bmi":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Bmi, CultureInfo.GetCultureInfo("de-DE").NumberFormat)
                                    })
                                    .ToList();
                    case "fat":
                        return db.FitBitData
                                    .Where(w => w.Date >= dateToStart_Date && w.Date <= dateToFinish_Date)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Fat, CultureInfo.GetCultureInfo("de-DE").NumberFormat)
                                    })
                                    .ToList();


                    //TODO: Add more select queries...
                    default:
                        throw new Exception("variableToGet is not defined properly");
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Azure_AnomalyIdentifier_InputModel NormalizeDataForAAI(List<DbDataRetrievalInstance_Model> db_data)
        {
            try
            {
                //initialize variables...
                var normalizedData = new Azure_AnomalyIdentifier_InputModel();
                normalizedData.Points = new List<Azure_AnomalyIdentifier_Point_Instance_InputModel>();

                //foreach entry in database data...
                foreach (var db_item in db_data)
                {
                    normalizedData.Points.Add(
                        new Azure_AnomalyIdentifier_Point_Instance_InputModel
                        {
                            Timestamp = db_item.instanceDate.ToUniversalTime().ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss'Z'"),
                            Value = db_item.instanceVariableValue //checking variable given...
                    });
                }

                //normalizedData.Period = 7; //deprecated
                return normalizedData;
            }
            catch (Exception e)
            {
                throw e;
            }            
        }

        public List<ApiOutput_Instance_Model> GenerateDataForGraph(Azure_AnomalyIdentifier_OutputModel analysis_data, List<DbDataRetrievalInstance_Model> db_data)
        {
            try
            {
                if (analysis_data.IsAnomaly.Count == db_data.Count)
                {
                    var outputModel = new List<ApiOutput_Instance_Model>();
                    for (int i = 0; i < analysis_data.IsAnomaly.Count; i++)
                    {
                        outputModel.Add(new ApiOutput_Instance_Model()
                        {
                            RequestedVariable_Date = db_data[i].instanceDate.ToString(),
                            RequestedVariable_Value = db_data[i].instanceVariableValue,
                            AnomalyDetected = analysis_data.IsAnomaly[i],
                            ExpectedValue = analysis_data.ExpectedValue[i],
                            AnomalyDetected_Neg = analysis_data.IsAnomaly_Neg[i],
                            AnomalyDetected_Pos = analysis_data.IsAnomaly_Pos[i],
                            LowerLimit = analysis_data.ExpectedValue[i] - analysis_data.LowerMargin[i],
                            UpperLimit = analysis_data.ExpectedValue[i] + analysis_data.UpperMargin[i]

                        });
                    }
                    return outputModel;
                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
