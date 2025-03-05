CREATE OR ALTER  PROCEDURE deleteIncident
    @incidentId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Incidents WHERE incidentId = @incidentId;
END
go