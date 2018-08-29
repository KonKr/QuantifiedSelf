using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models.Azure_AnomalyIdentifier_Models;

namespace WebApi.Models
{
    public class Azure_AnomalyIdentifier_InputModel
    {
        public int Period { get; set; }
        public List<Azure_AnomalyIdentifier_Point_Instance_InputModel> Points { get; set; }
    }
}
