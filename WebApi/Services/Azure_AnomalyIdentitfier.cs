using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using WebApi.Models;
using Newtonsoft.Json;

namespace WebApi.Services
{
    public class Azure_AnomalyIdentitfier
    {
        private string subscriptionKey = "b91c6503819a4f55b31ca414eea8c596";
        private string endpoint = "https://api.labs.cognitive.microsoft.com/anomalyfinder/v1.0/anomalydetection";
        private string requestData;


        public async Task<string> RequestAnalysis(Azure_AnomalyIdentifier_toSend_AzureApi_Model modelToAnalyze)
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
                //if (res.IsSuccessStatusCode)
                    return await res.Content.ReadAsStringAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
