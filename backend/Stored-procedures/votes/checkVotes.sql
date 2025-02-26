CREATE OR ALTER PROCEDURE checkUserVote
    @userId UNIQUEIDENTIFIER,
    @pollId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 1 FROM Votes WHERE userId = @userId AND pollId = @pollId;
END;
