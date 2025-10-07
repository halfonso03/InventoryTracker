using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class item_disposal_date_must_have_disposal_status2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Item_Disposal",
                table: "Items");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Item_Disposal",
                table: "Items",
                sql: "[itemStatusId] != 4 AND  [DisposalDate] IS NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Item_Disposal",
                table: "Items");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Item_Disposal",
                table: "Items",
                sql: "[itemStatusId] = 4 AND  NOT [DisposalDate] IS NULL");
        }
    }
}
