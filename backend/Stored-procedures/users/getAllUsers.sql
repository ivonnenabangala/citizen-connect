CREATE OR ALTER PROCEDURE getAllUsers
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Users;
END
GO;