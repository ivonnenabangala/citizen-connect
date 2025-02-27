CREATE OR ALTER PROCEDURE deleteTopic
    @topicId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM TopicQuestion WHERE topicId = @topicId;
END
Go;
