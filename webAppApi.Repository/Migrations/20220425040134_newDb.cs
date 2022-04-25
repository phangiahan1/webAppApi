using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace webAppApi.Repository.Migrations
{
    public partial class newDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "File",
                columns: table => new
                {
                    FileId = table.Column<string>(type: "NVARCHAR(100)", nullable: false),
                    name = table.Column<string>(type: "NVARCHAR(100)", nullable: false),
                    extension = table.Column<string>(type: "NVARCHAR(10)", nullable: false),
                    createAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    createBy = table.Column<string>(type: "NVARCHAR(100)", nullable: false),
                    modifiedAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    modifiedBy = table.Column<string>(type: "NVARCHAR(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_fileid", x => x.FileId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "File");
        }
    }
}
