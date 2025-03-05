CREATE OR ALTER PROCEDURE getDocumentById
    @documentId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM Documents
    WHERE documentId = @documentId;
END
go