CREATE OR ALTER PROCEDURE deleteDocument
    @incidentId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Incidents WHERE incidentId = @incidentId;
END
Go;