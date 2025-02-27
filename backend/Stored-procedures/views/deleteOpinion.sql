CREATE OR ALTER PROCEDURE deleteOpinion
    @opinionId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Opinions WHERE opinionId = @opinionId;
END
Go;

