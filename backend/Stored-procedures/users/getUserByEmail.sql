CREATE OR ALTER PROCEDURE getUserByEmail(
    @email VARCHAR(100))
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM Users
    WHERE email = @email;
END;
GO
