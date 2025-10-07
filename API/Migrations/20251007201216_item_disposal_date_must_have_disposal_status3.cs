using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class item_disposal_date_must_have_disposal_status3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "CK_Item_Disposal1",
                table: "Items",
                sql: "[itemStatusId] = 4 AND  NOT [DisposalDate] IS NULL");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Item_Disposal2",
                table: "Items",
                sql: "[itemStatusId] != 4 AND  [DisposalDate] IS NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Item_Disposal1",
                table: "Items");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Item_Disposal2",
                table: "Items");
        }
    }
}
