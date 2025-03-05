CREATE OR ALTER PROCEDURE addTopic
    @question VARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO TopicQuestion (question)
    VALUES (@question)
END
GO