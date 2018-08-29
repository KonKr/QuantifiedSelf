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
    }
}
