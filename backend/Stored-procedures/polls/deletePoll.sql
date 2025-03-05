CREATE OR ALTER PROCEDURE deletePoll
    @pollId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Polls WHERE pollId = @pollId;
END
Go
