using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models.Azure_AnomalyIdentifier_Models;

namespace WebApi.Models
{
    public class Azure_AnomalyIdentifier_toSend_AzureApi_Model
    {
        public int Period { get; set; }
        public List<Azure_AnomalyIdentifier_Point_Instance_Model> Points { get; set; }
    }
}
