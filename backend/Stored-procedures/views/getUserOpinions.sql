CREATE OR ALTER PROCEDURE getUserOpinionsOnTopic
    @opinionId INT,
    @userId VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM Opinions
    WHERE opinionId = @opinionId AND userId = @userId
END
GO;