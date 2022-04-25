using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webAppApi.Data.EntityMapper
{
    public class FileMap : IEntityTypeConfiguration<File>
    {
        void IEntityTypeConfiguration<File>.Configure(EntityTypeBuilder<File> builder)
        {
            builder.HasKey(x => x.FileId).HasName("pk_fileid");
            builder.Property(x => x.FileId).ValueGeneratedOnAdd()
                .HasColumnName("FileId")
                .HasColumnType("NVARCHAR(100)");
            builder.Property(x => x.name).ValueGeneratedOnAdd()
               .HasColumnName("name")
               .HasColumnType("NVARCHAR(100)")
               .IsRequired();
            builder.Property(x => x.extension).ValueGeneratedOnAdd()
               .HasColumnName("extension")
               .HasColumnType("NVARCHAR(10)")
               .IsRequired();
            builder.Property(x => x.createAt).ValueGeneratedOnAdd()
               .HasColumnName("createAt")
               .HasColumnType("datetime");
            builder.Property(x => x.createBy).ValueGeneratedOnAdd()
              .HasColumnName("createBy")
              .HasColumnType("NVARCHAR(100)")
              .IsRequired();
            builder.Property(x => x.modifiedAt).ValueGeneratedOnAdd()
               .HasColumnName("modifiedAt")
               .HasColumnType("datetime");
            builder.Property(x => x.modifiedBy).ValueGeneratedOnAdd()
              .HasColumnName("modifiedBy")
              .HasColumnType("NVARCHAR(100)");

        }
    }
}
