CREATE OR ALTER PROCEDURE addOrUpdatePoll
    @pollId INT = NULL, -- NULL for new poll, existing ID for update
    @question VARCHAR(255),
    @expires_at DATETIME = NULL,
    @status VARCHAR(10) = 'open'
AS
BEGIN
    SET NOCOUNT ON;

    IF @pollId IS NULL
    BEGIN
        -- Insert new poll
        INSERT INTO Polls (question, expires_at, status)
        VALUES (@question, @expires_at, @status);
    END
    ELSE
    BEGIN
        -- Check if the poll exists before updating
        IF EXISTS (SELECT 1 FROM Polls WHERE pollId = @pollId)
        BEGIN
            -- Update existing poll
            UPDATE Polls
            SET question = @question,
                expires_at = @expires_at,
                status = @status
            WHERE pollId = @pollId;
        END
        ELSE
        BEGIN
            PRINT 'Poll not found. Update failed.';
        END
    END
END;
