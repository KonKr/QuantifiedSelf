using System;
using System.Collections.Generic;
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
                switch (variableToGet)
                {
                    case "awakaningscount":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.AwakeningsCount)
                                    })
                                    .ToList();
                    case "calories":
                        return db.FitBitData
                                    .Take(rowsToExpect)
                                    .Select(s => new DbDataRetrievalInstance_Model
                                    {
                                        instanceDate = s.Date,
                                        instanceVariableValue = Convert.ToDouble(s.Calories)
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

                normalizedData.Period = 7;
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
                            AnomalyDetected = analysis_data.IsAnomaly[i]
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
