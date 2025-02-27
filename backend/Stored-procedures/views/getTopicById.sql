CREATE OR ALTER PROCEDURE getTopicById
    @topicId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM TopicQuestion
    WHERE topicId = @topicId;
END
GO;