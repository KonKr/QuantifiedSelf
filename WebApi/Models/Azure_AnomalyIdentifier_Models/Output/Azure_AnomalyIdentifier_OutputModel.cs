using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Azure_AnomalyIdentifier_Models.Output
{
    public class Azure_AnomalyIdentifier_OutputModel
    {
        public int Period { get; set; }
        public List<double> ExpectedValue { get; set; }
        public List<bool> IsAnomaly { get; set; }
        public List<bool> IsAnomaly_Neg { get; set; }
        public List<bool> IsAnomaly_Pos { get; set; }
        public List<double> UpperMargin { get; set; }
        public List<double> LowerMargin { get; set; }
        public string WarningText { get; set; }
        
    }
}
