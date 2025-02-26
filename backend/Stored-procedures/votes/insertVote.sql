CREATE OR ALTER PROCEDURE insertUserVote
    @userId UNIQUEIDENTIFIER,
    @pollId INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Votes (userId, pollId)
    VALUES (@userId, @pollId);
END;