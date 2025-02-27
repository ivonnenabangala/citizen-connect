CREATE OR ALTER PROCEDURE addDocument
    @title VARCHAR(255),
    @description VARCHAR(1000),
    @fileUrl VARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Documents ( title, description, fileUrl)
    VALUES ( @title, @description, @fileUrl)
END
GO;