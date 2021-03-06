// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using webAppApi.Repository;

namespace webAppApi.Repository.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.16")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("webAppApi.Data.File", b =>
                {
                    b.Property<string>("FileId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NVARCHAR(100)")
                        .HasColumnName("FileId");

                    b.Property<DateTime>("createAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasColumnName("createAt");

                    b.Property<string>("createBy")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NVARCHAR(100)")
                        .HasColumnName("createBy");

                    b.Property<string>("extension")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NVARCHAR(10)")
                        .HasColumnName("extension");

                    b.Property<DateTime>("modifiedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasColumnName("modifiedAt");

                    b.Property<string>("modifiedBy")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NVARCHAR(100)")
                        .HasColumnName("modifiedBy");

                    b.Property<string>("name")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NVARCHAR(100)")
                        .HasColumnName("name");

                    b.HasKey("FileId")
                        .HasName("pk_fileid");

                    b.ToTable("File");
                });
#pragma warning restore 612, 618
        }
    }
}
