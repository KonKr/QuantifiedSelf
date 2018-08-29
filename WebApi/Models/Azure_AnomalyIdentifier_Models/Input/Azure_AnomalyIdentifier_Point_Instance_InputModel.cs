using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Azure_AnomalyIdentifier_Models
{
    public class Azure_AnomalyIdentifier_Point_Instance_InputModel
    {
        public string Timestamp { get; set; }
        public double Value { get; set; }    
    }
}
