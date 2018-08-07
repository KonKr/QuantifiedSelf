using System;
using System.Collections.Generic;

namespace WebApi.Models
{
    public partial class FitBitData
    {
        public DateTime Date { get; set; }
        public int Steps { get; set; }
        public string Distance { get; set; }
        public int Floors { get; set; }
        public int Elevation { get; set; }
        public int Calories { get; set; }
        public int MinutesSedentary { get; set; }
        public int MinutesLightlyActive { get; set; }
        public int MinutesFairlyActive { get; set; }
        public int MinutesVeryActive { get; set; }
        public string StartTime { get; set; }
        public int TimeInBed { get; set; }
        public int MinutesAsleep { get; set; }
        public int AwakeningsCount { get; set; }
        public int MinutesAwake { get; set; }
        public int MinutesToFallAsleep { get; set; }
        public int MinutesAfterWakeup { get; set; }
        public int Efficiency { get; set; }
        public string Weight { get; set; }
        public string Bmi { get; set; }
        public string Fat { get; set; }
    }
}
