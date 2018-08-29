using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using WebApi.Models;
using Newtonsoft.Json;
using WebApi.Models.Azure_AnomalyIdentifier_Models;
using WebApi.Models.Azure_AnomalyIdentifier_Models.Output;

namespace WebApi.Services
{
    public class Azure_AnomalyIdentitfier
    {
        private string subscriptionKey = "b91c6503819a4f55b31ca414eea8c596";
        private string endpoint = "https://api.labs.cognitive.microsoft.com/anomalyfinder/v1.0/anomalydetection";
        private string requestData;


        public async Task<Azure_AnomalyIdentifier_OutputModel> AnalyzeData(Azure_AnomalyIdentifier_InputModel modelToAnalyze)
        {            
            try
            {
                //Convert obj to json string...
                requestData = JsonConvert.SerializeObject(modelToAnalyze);

                //create a new http client and perform request...
                var httpClient = new HttpClient();
                httpClient.BaseAddress = new Uri(endpoint);
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);
                var content = new StringContent(requestData, Encoding.UTF8, "application/json");
                var res = await httpClient.PostAsync(endpoint, content);
                if (res.IsSuccessStatusCode)                
                    return JsonConvert.DeserializeObject<Azure_AnomalyIdentifier_OutputModel>(await res.Content.ReadAsStringAsync());
                throw new Exception();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        

    }
}
