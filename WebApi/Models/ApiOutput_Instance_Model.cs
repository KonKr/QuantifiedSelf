using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class ApiOutput_Instance_Model
    {
        public string RequestedVariable_Date { get; set; }
        public double RequestedVariable_Value { get; set; }
        public bool AnomalyDetected { get; set; }
        public bool AnomalyDetected_Neg { get; set; }
        public bool AnomalyDetected_Pos { get; set; }
        public double ExpectedValue { get; set; }
        public double UpperLimit { get; set; }
        public double LowerLimit { get; set; }

    }
}
