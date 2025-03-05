CREATE OR ALTER PROCEDURE addIncident
    @userId VARCHAR(255),
    @title VARCHAR(255),
    @description VARCHAR(1000),
    @location VARCHAR(100),
    @imageUrls VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Incidents ( userId, title, description, location, imageUrls)
    VALUES ( @userId, @title, @description, @location, @imageUrls)
END
go
