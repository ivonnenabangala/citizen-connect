CREATE OR ALTER PROCEDURE getOpinions
    @topicId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM Opinions
    WHERE topicId = @topicId
END
GO;
