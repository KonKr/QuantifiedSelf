using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebApi.Models
{
    public partial class Quantified_Self_DBContext : DbContext
    {
        public virtual DbSet<FitBitData> FitBitData { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=quantifiedself.database.windows.net;Database=Quantified_Self_DB; User ID=kapoios; Password=qwerty123456!@#$%^");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FitBitData>(entity =>
            {
                entity.HasKey(e => e.Date);

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.AwakeningsCount).HasColumnName("awakeningsCount");

                entity.Property(e => e.Bmi)
                    .IsRequired()
                    .HasColumnName("bmi")
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.Calories).HasColumnName("calories");

                entity.Property(e => e.Distance)
                    .IsRequired()
                    .HasColumnName("distance")
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Efficiency).HasColumnName("efficiency");

                entity.Property(e => e.Elevation).HasColumnName("elevation");

                entity.Property(e => e.Fat)
                    .IsRequired()
                    .HasColumnName("fat")
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.Floors).HasColumnName("floors");

                entity.Property(e => e.MinutesAfterWakeup).HasColumnName("minutesAfterWakeup");

                entity.Property(e => e.MinutesAsleep).HasColumnName("minutesAsleep");

                entity.Property(e => e.MinutesAwake).HasColumnName("minutesAwake");

                entity.Property(e => e.MinutesFairlyActive).HasColumnName("minutesFairlyActive");

                entity.Property(e => e.MinutesLightlyActive).HasColumnName("minutesLightlyActive");

                entity.Property(e => e.MinutesSedentary).HasColumnName("minutesSedentary");

                entity.Property(e => e.MinutesToFallAsleep).HasColumnName("minutesToFallAsleep");

                entity.Property(e => e.MinutesVeryActive).HasColumnName("minutesVeryActive");

                entity.Property(e => e.StartTime)
                    .HasColumnName("startTime")
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Steps).HasColumnName("steps");

                entity.Property(e => e.TimeInBed).HasColumnName("timeInBed");

                entity.Property(e => e.Weight)
                    .IsRequired()
                    .HasColumnName("weight")
                    .HasMaxLength(6)
                    .IsUnicode(false);
            });
        }
    }
}
