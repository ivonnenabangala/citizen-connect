CREATE OR ALTER PROCEDURE getIncidentById
    @incidentId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM Incidents
    WHERE incidentId = @incidentId;
END
GO;