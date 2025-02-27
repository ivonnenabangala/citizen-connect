CREATE OR ALTER PROCEDURE addOpinion
    @topicId INT
    @userId VARCHAR(255)
    @opinion VARCHAR(1600),
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Opinions (topicId, opinion, userId)
    VALUES (@topicId, @opinion, @userId)
END
GO;