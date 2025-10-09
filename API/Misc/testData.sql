


DECLARE @Counter INT = 1;

WHILE @Counter <= 97
BEGIN
   declare @couterAsString varchar(100) = cast(@counter as VARCHAR(100))
   declare @assignedId int = null

   if @Counter % 3 = 0
		set @assignedId = 4
	else if @Counter % 4 = 0
		set @assignedId = 2

	
	INSERT INTO [dbo].[Items]
			   ([Description]
			   ,[CreatedOn]
			   ,[HbcNumber]
			   ,[ComputerName]
			   ,[SerialNumber]
			   ,[ItemTypeId]
			   ,[InitiativeId]
			   ,[DateAssigned]
			   ,[AssignedToId]
			   ,[Cubicle_Room]
			   ,[IPAddress]
			   ,[ItemStatusId]
			   ,[DisposalDate])
		 VALUES
			   ('Laptop ' + @couterAsString,
			   getdate(),
			   'HBC ' + @couterAsString,
			   null,
			   'SerialNumber'  + @couterAsString,
			   3,
			   null,
			   IIF(@assignedId is null, null, GETDATE()),
			   @assignedId,
			   null,
			   null,
			   IIF(@assignedId is null, 1, 2),
			   null)

    SET @Counter = @Counter + 1;
END;

GO


--ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [CK_Item_Disposal1] CHECK  (([itemStatusId] <> 4 AND [DisposalDate] IS NULL) OR ([itemStatusId] = 4 AND NOT [DisposalDate] IS NULL))



--ALTER TABLE [dbo].[Items]  drop CONSTRAINT [CK_Item_Disposal1] 
