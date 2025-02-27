CREATE OR ALTER PROCEDURE deleteDocument
    @documentId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Documents WHERE documentId = @documentId;
END
Go;
