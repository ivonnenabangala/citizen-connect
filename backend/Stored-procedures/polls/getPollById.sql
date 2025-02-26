CREATE OR ALTER PROCEDURE getPollById
    @pollId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM Polls
    WHERE pollId = @pollId;
END
GO;