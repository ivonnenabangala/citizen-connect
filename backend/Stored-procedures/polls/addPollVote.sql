CREATE OR ALTER PROCEDURE addVotePoll
    @pollId INT,
    @vote VARCHAR(10) -- 'yes' or 'no'
AS
BEGIN
    SET NOCOUNT ON;

    IF @vote = 'yes'
    BEGIN
        UPDATE Polls
        SET yes_votes = yes_votes + 1
        WHERE pollId = @pollId;
    END
    ELSE IF @vote = 'no'
    BEGIN
        UPDATE Polls
        SET no_votes = no_votes + 1
        WHERE pollId = @pollId;
    END
    ELSE
    BEGIN
        PRINT 'Invalid vote type. Use "yes" or "no".';
    END
END
go