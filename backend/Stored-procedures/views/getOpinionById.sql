CREATE OR ALTER PROCEDURE getOpinionById
    @opinionId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM Opinions
    WHERE opinionId = @opinionId;
END
GO;